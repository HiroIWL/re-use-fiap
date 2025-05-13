import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

type User = {
    id: number;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
};

const API = 'http://localhost:3001';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('user').then((stored) => {
            if (stored) {
                setUser(JSON.parse(stored));
            }
            setLoading(false);
        });
    }, []);

    const login = async (email: string, password: string) => {
        const res = await fetch(`${API}/users?email=${email}&password=${password}`);
        const data = await res.json();
        if (data.length === 0) throw new Error('Credenciais inválidas');
        await AsyncStorage.setItem('user', JSON.stringify(data[0]));
        setUser(data[0]);
    };

    const register = async (name: string, email: string, password: string) => {
        const res = await fetch(`${API}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const newUser = await res.json();
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth precisa estar dentro de AuthProvider');
    return ctx;
};
