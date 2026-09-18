import { configureStore } from "@reduxjs/toolkit";
import darkReducer from "./Filter/DarkSlice";

export const Store = configureStore({
    reducer: {
        dark: darkReducer,
    },
});