import axios from 'axios';

// Nueva Base URL proporcionada por el usuario
const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:HmzuGqkP';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async () => {
    try {
        const response = await api.get('/product');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await api.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await api.get('/category');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await api.post('/product', productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await api.patch(`/product/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error(`Error updating product ${id}:`, error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await api.delete(`/product/${id}`);
        return true;
    } catch (error) {
        console.error(`Error deleting product ${id}:`, error);
        throw error;
    }
};
