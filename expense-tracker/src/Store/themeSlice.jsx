import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    theme: "light",
    themeBackground: "#FEF3C7",
}

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers: {
        changeTheme(state, action) {
            state.theme = action.payload.theme;
            state.themeBackground = action.payload.themeBackground;
        },
        removeTheme(state){
            state.theme = initialThemeState.theme;
            state.themeBackground = initialThemeState.themeBackground;
        }
    },
})

export const {changeTheme,removeTheme} = themeSlice.actions;
export default themeSlice.reducer;