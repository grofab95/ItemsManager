import React from "react";
import Home from "../Home";
import ensureNonExpiredTokens from "../utils/ensureNonExpiredTokens";
import FetchDashboardData from "./FetchDashboardData";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import Users from "../Views/UsersPage/Users";

const Dashboard: React.FC = () => {
    React.useEffect(() => {
        ensureNonExpiredTokens();
    }, []);

    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </Layout>
            <FetchDashboardData />
        </>
    );
};
export default Dashboard;
