import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";
import ApiResponse from "../../interfaces/ApiResponse";
import User from "../../interfaces/Users/User";
import AddUser from "../../interfaces/Users/RegisterUser";
import AddUserResult from "../../interfaces/Users/AddUserResult";
import ApiResponseWithoutData from "../../interfaces/ApiResponseWithoutData";
import ChangePasswordFactors from "../../interfaces/Users/ChangePasswordFactors";

const apiUrls = {
    getUsers: () => "users",
    addUser: () => "users",
    changePassword: (userId: string) => `users/${userId}/change-password`,
};

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (_, thunkAPI) => {
        try {
            console.log("getUsers");
            const response = await apiClient.get<ApiResponse<User[]>>(
                apiUrls.getUsers()
            );
            if (!response.data.isSuccess) {
                return thunkAPI.rejectWithValue({ error: response.data.error });
            }

            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const addUser = createAsyncThunk(
    "addUser/addUser",
    async (
        payload: {
            registeredUser: AddUser;
            onSuccessfulResponse: () => void;
        },
        thunkApi
    ) => {
        try {
            console.log("addUser");
            const response = await apiClient.post<ApiResponse<AddUserResult>>(
                apiUrls.addUser(),
                payload.registeredUser
            );

            if (!response.data.isSuccess) {
                return thunkApi.rejectWithValue({
                    error: response.data.error,
                    errors: response.data.errors,
                });
            }

            payload.onSuccessfulResponse();
            return await response.data.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.message });
        }
    }
);

export const changePassword = createAsyncThunk(
    "user/changePassword",
    async (
        payload: {
            userId: string;
            changePassword: ChangePasswordFactors;
            onSuccessfulResponse: () => void;
        },
        thunkApi
    ) => {
        try {
            console.log("changePassword");
            const response = await apiClient.post<ApiResponseWithoutData>(
                apiUrls.changePassword(payload.userId),
                payload.changePassword
            );

            if (!response.data.isSuccess) {
                return thunkApi.rejectWithValue({
                    error: response.data.error,
                    errors: response.data.errors,
                });
            }

            payload.onSuccessfulResponse();
            return await response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.message });
        }
    }
);
