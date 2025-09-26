// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./components/user-routes/UserDashBoard.jsx";
import Profile from "./components/user-routes/Profile";
import { AuthProvider } from "./context/AuthContext";
import SweetList from "./components/user-routes/SweetList";
import AddSweet from "./components/user-routes/AddSweet";
import UpdateSweet from "./components/user-routes/UpdateSweet";
import SweetDetails from "./components/user-routes/SweetDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "private",
                element: <PrivateRoute />,
                children: [
                    {
                        path: "dashboard",
                        element: <UserDashboard />,
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "sweets",
                        element: <SweetList />,
                    },
                    {
                        path: "add-sweet",
                        element: <AddSweet />,
                    },
                    {
                        path: "sweet/:sweetId",
                        element: <SweetDetails />,
                    },
                    {
                        path: "update-sweet/:sweetId",
                        element: <UpdateSweet />,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);