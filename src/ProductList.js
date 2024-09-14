import React, { useState, useEffect } from 'react';
import './product.css';
import { useCart } from './CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch('./products.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    console.error('Products data is not an array:', data);
                    setError('Products data is not in the expected format.');
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('There was a problem fetching the products.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!products || products.length === 0) {
        return <p>No products available.</p>;
    }

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-box">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-description">{product.description}</p>
                    <button 
                        className="add-to-cart-button"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
