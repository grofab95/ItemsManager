import User from './Users/User'

export default interface AuthTokens {
    accessToken: string,
    refreshToken: string
}

export interface AuthenticationResult {
    user: User
    accessToken: string
    refreshToken: string
}