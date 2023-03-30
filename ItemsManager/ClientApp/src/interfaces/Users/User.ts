export default interface User {
    id: string;
    email: string;
    roles: string[];
    isActive: boolean;
    isOnline: boolean;
}
