// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { isLoggedin, getUser } from '../auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Load auth state from localStorage when app starts
    useEffect(() => {
        if (isLoggedin()) {
            const userData = JSON.parse(localStorage.getItem("sweetData")).user;
            setIsAuthenticated(true);
            setUser(userData);
            setIsAdmin(userData.role === 'ADMIN');
        }
    }, []);

    const loginContext = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        setIsAdmin(userData.role === 'ADMIN');
    };

    const logoutContext = () => {
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isAdmin, loginContext, logoutContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);