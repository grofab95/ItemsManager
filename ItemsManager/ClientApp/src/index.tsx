import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { ReactNotifications } from "react-notifications-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications-component/dist/theme.css";
import "./App.css";
import { store } from "./store/configureStore";
import LoginPage from "./Views/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <ReactNotifications />
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<Dashboard />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);

reportWebVitals();
