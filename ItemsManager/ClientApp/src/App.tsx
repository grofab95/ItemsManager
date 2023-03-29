import "./App.css";
import Layout from "./Dashboard/Layout";
import Home from "./Home";

import Users from "./Views/UsersPage/Users";
import LoginPage from "./Views/LoginPage/LoginPage";

function App() {
    const showLoginPage = true;

    return (
        <>
            {showLoginPage ? (
                <LoginPage />
            ) : (
                <Layout>
                    <Home />
                </Layout>
            )}
        </>
    );
}

export default App;
