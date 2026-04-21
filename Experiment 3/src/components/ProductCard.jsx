import React from 'react';

const ProductCard = ({ title, price, image, category }) => {
    return (
        <div className="product-card glass-card">
            <div className="product-image-placeholder">
                <span>{image || '📦'}</span>
            </div>
            <div className="product-info">
                <span className="category-tag">{category}</span>
                <h3>{title}</h3>
                <p className="price">{price}</p>
                <button className="btn-buy">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
