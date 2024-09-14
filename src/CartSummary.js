import React from 'react';
import { useCart } from './CartContext';
import './CartSummary.css'; // Ensure this is the correct path to your CSS file

const CartSummary = ({ onClose }) => {
    const { cart, updateQuantity } = useCart();

    const handleQuantityChange = (id, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        updateQuantity(id, newQuantity);
    };

    return (
        <div className="cart-summary">
            <button className="ProductList" onClick={onClose}>×</button>
            <h2>Cart Summary</h2>
            <div className="cart-items">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{item.title}</h3>
                                <p className="cart-item-price">Rs{item.price.toFixed(2)}</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(event) => handleQuantityChange(item.id, event)}
                                        min="1"
                                    />
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <p className="cart-item-total">Rs<h4>Total Amount :</h4>{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CartSummary;
