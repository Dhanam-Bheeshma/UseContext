import React, { useState } from 'react';
import { CartProvider } from './CartContext';
import ProductList from './ProductList';
import CartSummary from './CartSummary';
import './App.css';


const App = () => {
    const [showCart, setShowCart] = useState(false);

    return (
        <CartProvider>
            <div className="app">
                <button className="show-cart-button" onClick={() => setShowCart(true)}>
                    Cart
                </button>
                <ProductList />
                {showCart && (
                    <CartSummary onClose={() => setShowCart(false)} />
                )}
            </div>
        </CartProvider>
    );
};

export default App;
