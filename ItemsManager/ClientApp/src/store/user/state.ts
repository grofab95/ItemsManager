import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import User from "../../interfaces/Users/User";
import { getLoggedUserId } from "../../utils/authUtils";
import UserConnectionStatus from "../../interfaces/Users/UserConnectionStatus";
import {
    errorNotification,
    errorNotificationFromMany,
    infoNotification,
    successNotification,
} from "../../utils/notifications/notificationFactory";
import RegisterResponse from "../../interfaces/Users/RegisterResponse";
import { addUser, changePassword, getUsers } from "./api";

export interface UserState {
    isBusy: boolean;
    userList: User[];
    loggedUser: User;
}

const getDefaultState = () => {
    return {
        isBusy: false,
        userList: [],
        loggedUser: {} as User,
    } as UserState;
};

const userSlice = createSlice({
    name: "user",
    initialState: getDefaultState(),
    reducers: {
        userRegistered(state, action: PayloadAction<User>) {
            const user = action.payload;
            const index = state.userList.findIndex((x) => x.id === user.id);
            if (index === -1) {
                state.userList.push(user);
            }
        },

        userConnectionStatusChanged(
            state,
            action: PayloadAction<UserConnectionStatus>
        ) {
            const user = state.userList.find(
                (x) => x.id === action.payload.userId
            );
            if (user !== undefined) {
                user.isOnline = action.payload.isOnline;
                infoNotification(
                    `${user.email} is ${user.isOnline ? "online" : "offline"}`
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                addUser.fulfilled,
                (state, action: PayloadAction<RegisterResponse>) => {
                    state.isBusy = false;
                    const user = action.payload.user;
                    state.userList.push(user);
                    successNotification(
                        `Account for ${user.email} created successfully`
                    );
                }
            )
            .addCase(addUser.rejected, (state, action) => {
                state.isBusy = false;
                const error = (action.payload as any).error;
                const errors = (action.payload as any).errors;

                if (error === null && errors === null) {
                    errorNotification("Server Error");
                } else {
                    error && errorNotification(error);
                    errors && errorNotificationFromMany(errors);
                }
            })
            .addCase(addUser.pending, (state) => {
                state.isBusy = true;
            })
            .addCase(getUsers.pending, (state) => {
                state.isBusy = true;
            })
            .addCase(
                getUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.userList = action.payload;

                    const loggedUser = state.userList.find(
                        (u) => u.id === getLoggedUserId()
                    );
                    if (loggedUser !== undefined) {
                        state.loggedUser = loggedUser;
                    }

                    state.isBusy = false;
                }
            )
            .addCase(getUsers.rejected, (state, action) => {
                errorNotification(
                    (action.payload as any).error ?? "Server Error"
                );
                state.isBusy = false;
            })
            .addCase(changePassword.pending, (state) => {
                state.isBusy = true;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isBusy = false;
                successNotification(`Password changed successfully`);
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isBusy = false;
                const error = (action.payload as any).error;
                const errors = (action.payload as any).errors;

                if (error === null && errors === null) {
                    errorNotification("Server Error");
                } else {
                    error && errorNotification(error);
                    errors && errorNotificationFromMany(errors);
                }
            });
    },
});
export default userSlice;
