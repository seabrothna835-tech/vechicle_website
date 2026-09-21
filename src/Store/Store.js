import { configureStore } from "@reduxjs/toolkit";
import darkReducer from "./Filter/DarkSlice";
import cartReducer from "./CartSlice";

const STORAGE_KEY = "etec-store";

const loadState = () => {
    try {
        const savedState = localStorage.getItem(STORAGE_KEY);
        return savedState ? JSON.parse(savedState) : undefined;
    } catch {
        return undefined;
    }
};

export const Store = configureStore({
    reducer: {
        dark: darkReducer,
        cart: cartReducer,
    },
    preloadedState: loadState(),
});

Store.subscribe(() => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Store.getState()));
    } catch {
    }
});