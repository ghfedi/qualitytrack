import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import './index.css';
import Dashboard from "./Pages/Dashboard.jsx";
import Actions from "./Pages/Actions.jsx";
import Backoffice from "./Pages/Backoffice.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Actions" element={<Actions />} />
                    <Route path="/Backoffice" element={<Backoffice />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </React.StrictMode>
);
