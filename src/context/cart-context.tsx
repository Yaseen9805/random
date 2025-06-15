
"use client";

import type { Product, CartItem } from "@/types/shop";
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem("cartItems")) { 
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else if (cartItems.length === 0 && localStorage.getItem("cartItems")) {
        // If cart becomes empty and there was something in storage, clear storage
        localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    let itemExists = false;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        itemExists = true;
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    if (itemExists) {
      toast({
        title: "Item Updated",
        description: `${product.name} quantity increased in your cart.`,
      });
    } else {
      toast({
        title: "Item Added",
        description: `${product.name} added to your cart.`,
      });
    }
  };

  const removeFromCart = (productId: string) => {
    let removedItemName: string | undefined;
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        removedItemName = itemToRemove.name;
      }
      return prevItems.filter((item) => item.id !== productId);
    });

    if (removedItemName) {
      toast({
        title: "Item Removed",
        description: `${removedItemName} removed from your cart.`,
        variant: "destructive"
      });
    }
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId); // removeFromCart will handle its own toast
      return;
    }

    let updatedItemName: string | undefined;
    setCartItems((prevItems) => {
      const itemToUpdate = prevItems.find(item => item.id === productId);
      if (itemToUpdate) {
        updatedItemName = itemToUpdate.name;
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });

    if (updatedItemName) {
      toast({
        title: "Quantity Updated",
        description: `${updatedItemName} quantity updated to ${quantity}.`,
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    // This toast call is fine here as clearCart is an event handler
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
