import React, { useCallback } from "react";
import { getLoggedUserId } from "../utils/authUtils";
import { useAppDispatch } from "../app/hooks";
import { getUser } from "../store/userSession/api";
import { getUsers } from "../store/user/api";

const FetchDashboardData: React.FC = () => {
    const dispatch = useAppDispatch();
    const fetchData = useCallback(() => {
        console.log("fetchData");

        const loggedUserId = getLoggedUserId();
        dispatch(getUsers());
        dispatch(getUser(loggedUserId));
    }, [dispatch]);

    React.useEffect(fetchData, [fetchData]);

    return <></>;
};
export default FetchDashboardData;
