import React, { useCallback } from "react";
import { getLoggedUserId } from "../utils/authUtils";
import { useAppDispatch } from "../app/hooks";
import { getUser } from "../store/userSession/api";

const FetchDashboardData: React.FC = () => {
    const dispatch = useAppDispatch();
    const fetchData = useCallback(() => {
        console.log("fetchData");

        const loggedUserId = getLoggedUserId();
        dispatch(getUser(loggedUserId));
    }, [dispatch]);

    React.useEffect(fetchData, [fetchData]);

    return <></>;
};
export default FetchDashboardData;
