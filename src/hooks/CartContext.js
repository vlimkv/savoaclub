// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (exists) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleWhatsAppOrder = () => {
    const orderText = cartItems.map((item, index) => {
      return `${index + 1}. ${item.name} — ${item.quantity} шт. × ${item.price}`;
    }).join('\n');

    const total = totalPrice.toLocaleString("ru-RU");
    const fullMessage = `Заказ SAVOA:\n\n${orderText}\n\nИтого: ${total} ₸`;

    const encoded = encodeURIComponent(fullMessage);
    const whatsappURL = `https://wa.me/77760404661?text=${encoded}`;

    window.open(whatsappURL, '_blank');
  };

  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, handleWhatsAppOrder, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);