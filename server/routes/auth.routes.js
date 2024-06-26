const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware')
const FileService = require('../services/fileService')
const File = require('../models/File')

router.post('/registration',
    [
        check('email')
            .exists()
            .isEmail()
            .withMessage('is required'),
        check('password')
            .isLength({ min: 3, max: 12 })
            .withMessage('Password must be longer than 3 and shorter than 12'),
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Incorrect request', errors })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: `User with email ${email} alredy exist` })
            }

            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({ email, password: hashPassword })

            await user.save()
            await FileService.createDir(new File({ user: user.id, name: "" }))

            return res.json({ message: 'User has created' })
        } catch (error) {
            res.send({ message: "Server error" })
        }
    })

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ messgae: 'User not found' })
        }

        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' })
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (error) {
        res.send({ message: "Server error" })
        console.log(error)
    }
})

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' })
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (error) {
        res.send({ message: "Server error" })
        console.log(error)
    }
})
module.exports = router