import { combineReducers, ReducersMapObject } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ApplicationState, reducers } from ".";
import { signalrMiddleware } from "./configureSignalrConnection";
import userSessionSlice from "./userSession/state";

const buildRootReducer = (allReducers: ReducersMapObject<ApplicationState>) => {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers));
};

const allReducers = buildRootReducer(reducers);

export const store = configureStore({
    reducer: allReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(signalrMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
