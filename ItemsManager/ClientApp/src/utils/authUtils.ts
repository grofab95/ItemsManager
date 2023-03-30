import AuthTokens from "../interfaces/AuthTokens";
import * as jwt from "react-jwt";
import User from "../interfaces/Users/User";

export const ClaimType = {
    PERMISSION: "https://itemsmanager.pl/identity/claims/permission",
    ROLE: "https://itemsmanager.pl/identity/claims/role",
    NAME_IDENTIFIER:
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
};

export default interface JwtToken {
    name: string;
    iat: number;
    exp: number;
}

const TOKENS_KEY = "tokens";

export const getTokens = (): AuthTokens => {
    try {
        const storedTokens = localStorage.getItem(TOKENS_KEY);
        //console.log(storedTokens)

        if (!storedTokens) return {} as AuthTokens;

        return JSON.parse(storedTokens) as AuthTokens;
    } catch (error) {
        return {} as AuthTokens;
    }
};

export const getAccessToken = () => {
    const allTokens = getTokens();

    return allTokens?.accessToken ?? "";
};

export const saveTokens = (authTokens: AuthTokens) => {
    console.log("saveTokens");
    localStorage.setItem(TOKENS_KEY, JSON.stringify(authTokens));
};

export const deleteTokens = () => {
    console.log("deleteTokens");
    localStorage.removeItem(TOKENS_KEY);
};

// export const getPermissions = (): string[] => {
//     const token = getAccessToken();
//     if (token === "") return [];

//     const permissions = jwt.decodeToken<string[]>(token)[ClaimType.PERMISSION];
//     if (Array.isArray(permissions)) return permissions;

//     return [permissions] as string[];
// };

// export const hasPermissions = (permission: string): boolean => {
//     const userPermission = getPermissions();
//     console.log(userPermission);
//     return userPermission.includes(permission);
// };

export const getLoggedUserId = () => {
    const token = getAccessToken();
    if (token === "") return [];

    const loggedUserId = jwt.decodeToken<any>(token)[ClaimType.NAME_IDENTIFIER];
    console.log("getLoggedUserId", loggedUserId);

    return loggedUserId; // jwt.decodeToken(token)[ClaimType.NAME_IDENTIFIER];
};

// export const getRoles = (): string[] => {
//     const token = getAccessToken();
//     if (token === "") return [];

//     const roles = jwt.decodeToken(token)[ClaimType.ROLE];
//     if (Array.isArray(roles)) return roles;

//     return [roles] as string[];
// };
