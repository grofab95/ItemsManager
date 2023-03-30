import Home from "../Home";
import FetchDashboardData from "./FetchDashboardData";
import Layout from "./Layout";

const Dashboard: React.FC = () => {
    return (
        <>
            <Layout>
                <Home />
            </Layout>
            <FetchDashboardData />
        </>
    );
};
export default Dashboard;
