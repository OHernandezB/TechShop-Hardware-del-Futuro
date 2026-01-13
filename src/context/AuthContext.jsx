import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Recuperar sesión al cargar
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        const expires = localStorage.getItem('expires');

        if (storedToken && storedUser) {
            // Verificar expiración si existe
            if (expires && new Date(expires) < new Date()) {
                logout();
            } else {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);
    }, []);

    const handleAuthSuccess = (data) => {
        // Estructura esperada: { authToken, expires, user }
        const { authToken, user, expires } = data;

        if (authToken) {
            localStorage.setItem('token', authToken);
            setToken(authToken);
        }

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        }

        if (expires) {
            localStorage.setItem('expires', expires);
        }
    };

    const login = async (email, password) => {
        // 1. Auth Local de Administrador (Hardcoded)
        // Usamos trim() para evitar errores por espacios accidentales
        if (email.trim() === 'omarehb10@gmail.com' && password === 'Admin123') {
            console.log("Acceso de Administrador Local concedido");
            const adminUser = {
                id: 999,
                name: 'Administrador Local',
                email: 'omarehb10@gmail.com',
                role: 'admin'
            };
            // Token simulado
            const adminAuthData = {
                authToken: 'local-admin-token-secret-123',
                user: adminUser,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            };
            handleAuthSuccess(adminAuthData);
            return adminAuthData;
        }

        // 2. Auth Normal (Xano)
        console.log("Intentando login vía API...");
        const data = await loginUser({ email, password });
        handleAuthSuccess(data);
        return data;
    };

    const register = async (name, email, password) => {
        const data = await registerUser({ name, email, password });
        handleAuthSuccess(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expires');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
