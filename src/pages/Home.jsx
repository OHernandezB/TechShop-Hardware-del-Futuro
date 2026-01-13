import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const products = await getProducts();
                // Filter featured products, simple filter for now
                const featured = products.filter(p => p.is_featured);
                setFeaturedProducts(featured.length > 0 ? featured : products.slice(0, 4));
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>TECH<span className="text-primary">SHOP</span></h1>
                    <p className="hero-subtitle">Equipa tu futuro. La mejor tecnología al mejor precio.</p>
                    <button className="cta-button" onClick={() => window.location.href = '/catalog'}>
                        Ver Catálogo Completo
                    </button>
                </div>
            </section>

            <section className="featured-section">
                <h2 className="section-title">Productos Destacados</h2>

                {loading ? (
                    <p>Cargando productos destacados...</p>
                ) : (
                    <div className="products-grid">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
