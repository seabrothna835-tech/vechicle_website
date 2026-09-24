import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: true,
    isLogin : false,
    isRegister : false,
    isAuthenticated: false
};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setDark: (state, action) => {
            state.isDark = action.payload;
        },
        setLogin: (state,action)=>{
            state.isLogin = action.payload
        },
        setRegister: (state,action)=>{
            state.isRegister = action.payload
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        }
    },
});

export const { setDark, setLogin, setRegister, setAuthenticated } = dataSlice.actions;

export default dataSlice.reducer;