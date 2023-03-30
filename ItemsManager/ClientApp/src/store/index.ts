import userSessionSlice, { UserSessionState } from "./userSession/state";

export interface ApplicationState {
    userSession: UserSessionState;
}

export const reducers = {
    userSession: userSessionSlice.reducer,
};
