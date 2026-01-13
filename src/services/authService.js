import axios from 'axios';

// Base URL especificada por el usuario
// Nota: Si el backend cambia, actualizar aquí.
const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:WUqbQvot';

export const authApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (userData) => {
    try {
        // Endpoint esperado: POST /auth/register
        // Se espera: { authToken, user, expires }
        const response = await authApi.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Registration Error:', error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        // Endpoint esperado: POST /auth/login
        const response = await authApi.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
        throw error;
    }
};

// Función helper para obtener headers de autorización
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};
