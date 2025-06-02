import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const decrementItem = (name) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const clearCart = () => setCartItems([]);

  const handleWhatsAppOrder = () => {
    const orderText = cartItems.map((item, index) => {
      return `${index + 1}. ${item.name} — ${item.quantity} шт. × ${item.price}`;
    }).join('\n');

    const total = cartItems.reduce((acc, item) => {
      const numeric = parseInt(item.price.replace(/[^\d]/g, ""));
      return acc + numeric * (item.quantity || 1);
    }, 0);

    const fullMessage = `Заказ SAVOA:\n\n${orderText}\n\nИтого: ${total.toLocaleString("ru-RU")} ₸`;

    const encoded = encodeURIComponent(fullMessage);
    const whatsappURL = `https://wa.me/77760404661?text=${encoded}`;

    window.open(whatsappURL, '_blank');
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, decrementItem, clearCart, handleWhatsAppOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);