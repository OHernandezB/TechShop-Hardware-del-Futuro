import React, { useState, useEffect } from 'react';
import { getProducts, getCategories, api } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Cargar datos en paralelo
            const [productsData, categoriesData] = await Promise.all([
                getProducts(),
                getCategories()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
            setError(null);
        } catch (err) {
            setError('Error al conectar con la base de datos de productos.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar productos
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category_id === selectedCategory);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Nuestro Catálogo</h1>

            {/* Filtros de Categoría */}
            <div className="category-filters">
                <button
                    className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('all')}
                >
                    Todas
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="loading-state">
                    <p>Cargando lo mejor en tecnología...</p>
                </div>
            ) : error ? (
                <div className="error-state">
                    <p>{error}</p>
                    <button onClick={fetchData} className="retry-btn">Reintentar</button>
                </div>
            ) : (
                <>
                    {filteredProducts.length === 0 ? (
                        <div className="empty-state">
                            <p>No se encontraron productos en esta categoría.</p>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Catalog;
