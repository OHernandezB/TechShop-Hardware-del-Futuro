import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../services/api';
import './CreateProduct.css'; // Reusamos estilos

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        image_url: ''
    });

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const product = await getProductById(id);
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock_quantity: product.stock_quantity,
                    image_url: product.image_url
                });
            } catch (err) {
                setError('Error al cargar el producto.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                stock_quantity: Number(formData.stock_quantity)
            };

            await updateProduct(id, payload);
            alert('¡Producto actualizado con éxito!');
            navigate('/admin');
        } catch (err) {
            console.error(err);
            setError('Error al actualizar el producto.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="create-product-container"><p>Cargando producto...</p></div>;

    return (
        <div className="create-product-container">
            <div className="create-card">
                <h2>Editar Producto #{id}</h2>

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
                        />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        />
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
                        />
                        {formData.image_url && (
                            <img src={formData.image_url} alt="Preview" style={{ width: '100px', marginTop: '10px', borderRadius: '4px' }} />
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>
                            Cancelar
                        </button>
                        <button type="submit" className="save-btn" disabled={saving}>
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
