import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct, getCategories } from '../../services/api';
import './CreateProduct.css';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category_id: '', // Empty initially
        image_url: ''
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
                // Definir una categoría por defecto si hay datos
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, category_id: data[0].id }));
                }
            } catch (err) {
                console.error("Error loading categories", err);
            }
        };
        loadCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!formData.name || !formData.price) {
                throw new Error('Nombre y Precio son obligatorios');
            }

            const payload = {
                ...formData,
                price: Number(formData.price),
                stock_quantity: Number(formData.stock_quantity),
                category_id: Number(formData.category_id)
            };

            await createProduct(payload);
            alert('¡Producto creado con éxito!');
            navigate('/admin');
        } catch (err) {
            console.error(err);
            setError('Error al crear el producto. Verifica los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-product-container">
            <div className="create-card">
                <h2>Nuevo Producto</h2>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre del Producto</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Ej. RTX 4090"
                        />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Detalles del producto..."
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label>Categoría</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="category-select"
                            required
                        >
                            {categories.length === 0 && <option value="">Cargando categorías...</option>}
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Precio ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="form-group">
                            <label>Stock</label>
                            <input
                                type="number"
                                name="stock_quantity"
                                value={formData.stock_quantity}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>URL de Imagen</label>
                        <input
                            type="text"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>
                            Cancelar
                        </button>
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? 'Guardando...' : 'Crear Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
