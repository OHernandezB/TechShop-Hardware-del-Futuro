import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const hasStock = product.stock_quantity > 0;

    return (
        <div className="product-card">
            <div className="card-image-container">
                <img src={product.image_url} alt={product.name} className="card-image" />
                {product.is_featured && <span className="featured-badge">Destacado</span>}
            </div>
            <div className="card-content">
                <h3 className="card-title">{product.name}</h3>

                {/* Stock Indicator */}
                <div className={`stock-indicator ${hasStock ? 'in-stock' : 'out-of-stock'}`}>
                    <span className="stock-dot"></span>
                    {hasStock ? `${product.stock_quantity} disponibles` : 'Sin stock'}
                </div>

                <p className="card-price">${product.price.toLocaleString()}</p>

                <button
                    className="add-to-cart-btn"
                    disabled={!hasStock}
                >
                    {hasStock ? 'Agregar al Carrito' : 'Agotado'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
