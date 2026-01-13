import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products for admin:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                console.error(error);
                alert('Error al eliminar');
            }
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Panel de Administración</h1>
                <button className="create-btn" onClick={() => navigate('/admin/create')}>
                    + Crear Nuevo
                </button>
            </div>

            <div className="admin-content">
                <h2>Inventario</h2>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Img</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th style={{ textAlign: 'center' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>
                                            {product.image_url && (
                                                <img src={product.image_url} alt="" className="admin-thumb" />
                                            )}
                                        </td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stock_quantity}</td>
                                        <td className="actions-cell">
                                            <div className="action-buttons">
                                                <button
                                                    className="action-icon edit"
                                                    onClick={() => navigate(`/admin/edit/${product.id}`)}
                                                    title="Editar"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    className="action-icon delete"
                                                    onClick={() => handleDelete(product.id)}
                                                    title="Eliminar"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
