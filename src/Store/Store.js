import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Filter/DarkSlice";
import cartReducer from "./CartSlice";

const STORAGE_KEY = "etec-store";

const getStorage = () => window.sessionStorage;

const loadState = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        const savedState = getStorage().getItem(STORAGE_KEY);
        return savedState ? JSON.parse(savedState) : undefined;
    } catch {
        return undefined;
    }
};

export const Store = configureStore({
    reducer: {
        data: dataReducer,
        cart: cartReducer,
    },
    preloadedState: loadState(),
});

Store.subscribe(() => {
    try {
        getStorage().setItem(STORAGE_KEY, JSON.stringify(Store.getState()));
    } catch {
    }
});