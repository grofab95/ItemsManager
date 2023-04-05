import userSlice, { UserState } from "./user/state";
import userSessionSlice, { UserSessionState } from "./userSession/state";

export interface ApplicationState {
    userSession: UserSessionState;
    user: UserState;
}

export const reducers = {
    userSession: userSessionSlice.reducer,
    user: userSlice.reducer,
};
