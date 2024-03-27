import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: 'file',
    initialState: {
        files: [],
        currentDir: null,
        popupDisplay: 'none',
        diskStack: []
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
        },
        pushToStack: (state, action) => {
            state.diskStack.push(action.payload)
        },
        popFromState: (state, action) => {
            state.currentDir = action.payload.slice(-1)
            state.currentDir = state.diskStack.pop()
        }
    },
})

export const {
    setFiles,
    setCurrentDir,
    addFile,
    setPopupDisplay,
    pushToStack,
    popFromState
} = fileSlice.actions
export default fileSlice.reducer