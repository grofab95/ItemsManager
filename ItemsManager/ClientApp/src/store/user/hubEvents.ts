import { withCallbacks } from "redux-signalr";
import userSlice from "./state";
import User from "../../interfaces/Users/User";
import UserConnectionStatus from "../../interfaces/Users/UserConnectionStatus";

export const userCallbacks = withCallbacks()
    .add("UserAdded", (user: User) => (dispatch) => {
        console.log("UserAdded", JSON.stringify(user));
        dispatch(userSlice.actions.userRegistered(user));
    })
    .add(
        "UserConnectionStatusChanged",
        (userConnectionStatus: UserConnectionStatus) => (dispatch) => {
            console.log(
                `UserConnectionStatusChanged`,
                JSON.stringify(userConnectionStatus)
            );
            dispatch(
                userSlice.actions.userConnectionStatusChanged(
                    userConnectionStatus
                )
            );
        }
    ).callbackMap;
