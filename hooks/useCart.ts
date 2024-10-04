import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  shop: string;
  quantity: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastShop, setLastShop] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedLastShop = localStorage.getItem('lastShop');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedLastShop) {
      setLastShop(storedLastShop);
    }
  }, []);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(i => i.id === item.id && i.shop === item.shop);
      let newCart: CartItem[];

      if (existingItemIndex > -1) {
        newCart = prevCart.map((cartItem, index) => 
          index === existingItemIndex 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newCart = [...prevCart, { ...item, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));
      localStorage.setItem('lastShop', item.shop);
      setLastShop(item.shop);
      return newCart;
    });
  };

  const removeFromCart = (id: number, shop: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => !(item.id === id && item.shop === shop));
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (id: number, shop: string, quantity: number) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item => 
        item.id === id && item.shop === shop ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  return { cart, lastShop, addToCart, removeFromCart, updateQuantity };
}