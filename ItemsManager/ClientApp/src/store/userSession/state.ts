import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteTokens, saveTokens } from "../../utils/authUtils";
import { getUser, login, logout } from "./api";
import { AuthenticationResult } from "../../interfaces/AuthTokens";
import User from "../../interfaces/Users/User";
import ApiResponseWithoutData from "../../interfaces/ApiResponseWithoutData";
import {
    errorNotification,
    successNotification,
} from "../../utils/notifications/notificationFactory";

export interface UserSessionState {
    currentUser: User;
    currentToken: string;
    showUserChangedPopup: boolean;
    accountDeactivated: boolean;
    passwordChangedByAdmin: boolean;
    isBusy: boolean;
}

const getDefaultState = () => {
    return {
        currentUser: {},
        currentToken: "",
        showUserChangedPopup: false,
        accountDeactivated: false,
        passwordChangedByAdmin: false,
        isBusy: false,
    } as UserSessionState;
};

const userSessionSlice = createSlice({
    name: "userSession",
    initialState: getDefaultState(),
    reducers: {
        currentUserChanged(state, action: PayloadAction<User>) {
            state.showUserChangedPopup = true;
            state.currentUser = action.payload;
        },
        userLogout() {
            deleteTokens();
            window.location.reload();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<AuthenticationResult>) => {
                    console.log("login.fulfilled");
                    state.currentUser = action.payload.user;
                    state.currentToken = action.payload.accessToken;
                    saveTokens({
                        accessToken: action.payload.accessToken,
                        refreshToken: action.payload.refreshToken,
                    });
                    state.isBusy = false;

                    console.log(
                        "userSession state.currentToken",
                        state.currentToken
                    );
                    console.log(action.payload.user);

                    if (action.payload.user.isActive)
                        successNotification(
                            `Logged as ${action.payload.user.email}`
                        );
                }
            )
            .addCase(login.rejected, (state, action) => {
                state.isBusy = false;
                console.log("login.rejected");

                errorNotification(
                    (action.payload as any).error ?? "Server Error"
                );
            })
            .addCase(login.pending, (state) => {
                state.isBusy = true;
            })
            .addCase(logout.pending, (state) => {
                console.log("logout.pending");
                //deleteTokens();
                //window.location.href = "/";
                // window.location.reload();
            })
            .addCase(
                logout.fulfilled,
                (state, action: PayloadAction<ApiResponseWithoutData>) => {
                    console.log("logout.fulfilled");
                    deleteTokens();
                    //window.location.href = "/";
                    window.location.reload();
                }
            )
            .addCase(logout.rejected, (state) => {
                console.log("logout.rejected");
                deleteTokens();
                //window.location.href = "/";
                window.location.reload();
            })
            .addCase(
                getUser.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.currentUser = action.payload;
                }
            );
    },
});
export default userSessionSlice;
