import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
            if (existingProductIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingProductIndex].quantity += 1;
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (id, quantity) => {
        setCart((prevCart) => {
            if (quantity <= 0) {
                return prevCart.filter(item => item.id !== id);
            } else {
                return prevCart.map(item => 
                    item.id === id ? { ...item, quantity } : item
                );
            }
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
