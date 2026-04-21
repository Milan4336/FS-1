import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Axios defaults for Cookies
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkStatus = async () => {
        try {
            const res = await axios.get('http://localhost:3008/api/auth/me');
            if (res.data.success) {
                setUser(res.data.user);
            }
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:3008/api/auth/login', { email, password });
        if (res.data.success) {
            setUser(res.data.user);
        }
        return res.data;
    };

    const logout = async () => {
        await axios.get('http://localhost:3008/api/auth/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
