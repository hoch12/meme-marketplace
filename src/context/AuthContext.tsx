import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user: User | null;
    login: (username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useLocalStorage<User | null>('meme_user', null);
    const navigate = useNavigate();

    const login = (username: string) => {
        setUser({ username, loggedIn: true });
        navigate('/dashboard');
    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};