import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";
import { AuthenticationResult } from "../../interfaces/AuthTokens";
import ApiResponse from "../../interfaces/ApiResponse";
import { getTokens } from "../../utils/authUtils";
import User from "../../interfaces/Users/User";
import ApiResponseWithoutData from "../../interfaces/ApiResponseWithoutData";

const apiUrls = {
    login: () => "authentication/login",
    refreshToken: () => "authentication/refresh-token",
    revokeToken: () => "authentication/revoke-token",
    getUser: (userId: string) => `users/${userId}`,
};

export const login = createAsyncThunk(
    "userSession/login",
    async (payload: { email: string; password: string }, thunkAPI) => {
        try {
            console.log("login");
            const response = await apiClient.post<
                ApiResponse<AuthenticationResult>
            >(apiUrls.login(), payload);
            if (!response.data.isSuccess) {
                return thunkAPI.rejectWithValue({ error: response.data.error });
            }

            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const refreshToken = createAsyncThunk(
    "userSession/refreshToken",
    async (_, thunkAPI) => {
        try {
            console.log("refreshToken");
            const payload = {
                refreshToken: getTokens().refreshToken,
            };
            const response = await apiClient.post<
                ApiResponse<AuthenticationResult>
            >(apiUrls.refreshToken(), payload);
            if (!response.data.isSuccess) {
                return thunkAPI.rejectWithValue({ error: response.data.error });
            }

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const logout = createAsyncThunk(
    "userSession/logout",
    async (_, thunkAPI) => {
        try {
            console.log("logout");
            const payload = {
                refreshToken: getTokens().refreshToken,
            };
            const response = await apiClient.post<ApiResponseWithoutData>(
                apiUrls.revokeToken(),
                payload
            );
            console.log(response);
            if (!response.data.isSuccess) {
                return thunkAPI.rejectWithValue({ error: response.data.error });
            }

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const getUser = createAsyncThunk(
    "userSession/getUser",
    async (userId: string, thunkAPI) => {
        try {
            console.log("getUser");
            const response = await apiClient.get<ApiResponse<User>>(
                apiUrls.getUser(userId)
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
