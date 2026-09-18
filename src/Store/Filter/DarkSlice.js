import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: true,
};

export const darkSlice = createSlice({
    name: "dark",
    initialState,
    reducers: {
        setDark: (state, action) => {
            state.isDark = action.payload;
        },
    },
});

export const { setDark } = darkSlice.actions;

export default darkSlice.reducer;