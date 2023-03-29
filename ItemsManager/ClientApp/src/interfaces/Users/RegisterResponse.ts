import User from "./User";

export default interface RegisterResponse {
    user: User,
    error: string,
    validationErrors: string[]
}