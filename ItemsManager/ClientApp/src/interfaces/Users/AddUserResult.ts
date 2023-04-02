import User from "./User";

export default interface AddUserResult {
    user: User;
    error: string;
    validationErrors: string[];
}
