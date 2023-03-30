import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { ReactNotifications } from "react-notifications-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications-component/dist/theme.css";
import { store } from "./store/configureStore";
import Layout from "./Dashboard/Layout";
import Home from "./Home";
import LoginPage from "./Views/LoginPage/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <ReactNotifications />
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
