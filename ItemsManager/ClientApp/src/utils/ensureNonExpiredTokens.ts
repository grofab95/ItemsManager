import JwtToken, {
    deleteTokens,
    getAccessToken,
    getTokens,
    saveTokens,
} from "./authUtils";
import apiClient from "./apiClient";
import ApiResponse from "../interfaces/ApiResponse";
import AuthTokens, { AuthenticationResult } from "../interfaces/AuthTokens";
import { isExpired, decodeToken } from "react-jwt";

const refreshToken = async () => {
    console.log("Refresh token");

    const allTokens = getTokens();
    const accessToken = allTokens?.accessToken ?? null;
    const refreshToken = allTokens?.refreshToken ?? null;

    if (!accessToken || !refreshToken) {
        console.error("Failed to refresh access token - invalid token");
        throw new Error("Failed to refresh access token");
    }

    const requestResult = await apiClient.post<
        ApiResponse<AuthenticationResult>
    >("authentication/refresh-token", {
        refreshToken: refreshToken,
    });

    if (!requestResult.data || !requestResult.data.isSuccess) {
        console.error("Failed to refresh access token: ", requestResult);
        throw new Error("Failed to refresh access token");
    }

    console.log("Successful refresh token");
    const tokens: AuthTokens = {
        accessToken: requestResult.data.data.accessToken,
        refreshToken: requestResult.data.data.refreshToken,
    };
    saveTokens(tokens);
};

const ensureNonExpiredTokens = async () => {
    const DEFAULT_TIMEOUT = 15000;

    try {
        const decodedToken = decodeToken<JwtToken>(getAccessToken());
        if (!decodedToken) {
            setTimeout(ensureNonExpiredTokens, DEFAULT_TIMEOUT);
            return;
        }

        const secondsToExpiration =
            (decodedToken.exp * 1000 - Date.now()) / 1000;
        if (secondsToExpiration < 30) {
            await refreshToken();
        }
    } catch (error) {
        console.error("Refresh token failed - terminate session");
        deleteTokens();
        window.location.reload();
    }
    setTimeout(ensureNonExpiredTokens, DEFAULT_TIMEOUT);
};
export default ensureNonExpiredTokens;
