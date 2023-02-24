import { configureStore } from "@reduxjs/toolkit";
import { navReducer } from "./slices";


export const store = configureStore({
    reducer: {
        nav: navReducer
    }
});