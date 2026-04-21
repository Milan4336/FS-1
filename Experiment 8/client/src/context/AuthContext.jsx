import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// --- DEMO ACCOUNTS (no backend needed) ---
const DEMO_USERS = {
    'admin@nexus.io':  { id: '1', name: 'Commander Shepard', email: 'admin@nexus.io',  role: 'admin',   password: 'demo123' },
    'editor@nexus.io': { id: '2', name: 'Garrus Vakarian',   email: 'editor@nexus.io', role: 'editor',  password: 'demo123' },
    'user@nexus.io':   { id: '3', name: 'Liara T\'Soni',     email: 'user@nexus.io',   role: 'user',    password: 'demo123' },
};

const STORAGE_KEY = 'nexus_e8_session';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Restore session from localStorage
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try { setUser(JSON.parse(saved)); } catch (_) {}
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 600));
        const found = DEMO_USERS[email.toLowerCase()];
        if (!found || found.password !== password) {
            return { success: false, message: 'Invalid credentials. Try demo123.' };
        }
        const { password: _, ...safeUser } = found;
        setUser(safeUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
        return { success: true, user: safeUser };
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
