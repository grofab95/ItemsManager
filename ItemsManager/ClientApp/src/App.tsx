import "./App.css";
import Layout from "./Dashboard/Layout";
import Home from "./Home";

import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./Views/UsersPage/Users";

function App() {
    return (
        <>
            <Layout>
                <Home />
            </Layout>
        </>
    );
}

export default App;
