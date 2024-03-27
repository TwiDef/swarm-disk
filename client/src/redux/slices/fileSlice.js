import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: 'file',
    initialState: {
        files: [],
        currentDir: null,
        popupDisplay: 'none'
    },
    reducers: {
        setFiles: (state, action) => {
            state.files = (action.payload)
        },
        setCurrentDir: (state, action) => {
            state.currentDir = action.payload
        },
        addFile: (state, action) => {
            state.files.push(action.payload)
        },
        setPopupDisplay: (state, action) => {
            state.popupDisplay = action.payload
        }
    },
})

export const { setFiles, setCurrentDir, addFile, setPopupDisplay } = fileSlice.actions
export default fileSlice.reducer