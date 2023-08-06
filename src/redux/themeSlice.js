import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    themeMode: 'light',
}

export const themeSlice = createSlice({


    name: 'theme',

    initialState,
    reducers: {
        makeThemeDark: (state) => {
            state.themeMode = 'dark'
        },
        makeThemeLight: (state) => {
            state.themeMode = 'light'
        },
    },
})

export const { makeThemeDark, makeThemeLight } = themeSlice.actions

export default themeSlice.reducer