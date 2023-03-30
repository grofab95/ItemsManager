import { isExpired } from "react-jwt";
import { deleteTokens, getAccessToken } from "../utils/authUtils";
import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const AuthenticationHoc: React.FC<Props> = (props) => {
    const token = getAccessToken();
    if (!token || token === "" || isExpired(token)) {
        deleteTokens();
        return <Navigate to="/login" />;
    }

    return <>{props.children}</>;
};
export default AuthenticationHoc;
