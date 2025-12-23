import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Meme, CartItem } from '../types'; // FIXED: Added 'type'

interface CartContextType {
    cart: CartItem[];
    addItem: (meme: Meme) => void;
    removeItem: (id: string) => void;
    decreaseCount: (id: string) => void;
    clearCart: () => void;
    totalPrice: number;
    totalItems: number;
}

// FIXED: Removed 'export' keyword.
// We don't need to export the raw Context if we have the useCart hook.
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useLocalStorage<CartItem[]>('meme_cart', []);

    const addItem = (meme: Meme) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === meme.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === meme.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...meme, quantity: 1 }];
        });
    };

    const decreaseCount = (id: string) => {
        setCart((prev) =>
            prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item)
                .filter(item => item.quantity > 0)
        );
    };

    const removeItem = (id: string) => setCart((prev) => prev.filter((item) => item.id !== id));
    const clearCart = () => setCart([]);

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, decreaseCount, clearCart, totalPrice, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};