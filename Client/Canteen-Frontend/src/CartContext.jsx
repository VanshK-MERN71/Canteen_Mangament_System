import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCart = async () => {
    try {
      
      const response = await fetch("http://localhost:3000/menu/cart", {
        credentials: "include",
      });
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        
        setCartCount(data.data.length);
      } else {
        console.warn("Invalid cart data format", data);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
