import { configureStore } from "@reduxjs/toolkit";
import pulsaReducer from "./pulsaslice";

export const store = configureStore({
    reducer: {
        pulsa: pulsaReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;