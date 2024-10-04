'use client'

import React, { useState, useRef } from 'react';
import { Trash2, ShoppingCart, ChevronDown, ChevronUp, Copy, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, CartItem } from '@/hooks/useCart';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  shop: string;
  quantity?: number;
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Won Ton with Sweet & Sour Sauce", price: 7.50, category: "Deep Fried", shop: "New Hong Kong Chinese Restaurant" },
  { id: 2, name: "Chicken Nuggets with Sweet & Sour Sauce", price: 14.00, category: "Deep Fried", shop: "New Hong Kong Chinese Restaurant" },
  { id: 3, name: "Prawn Balls with Sweet & Sour Sauce", price: 15.00, category: "Deep Fried", shop: "New Hong Kong Chinese Restaurant" },
  { id: 4, name: "Deep Fried Chicken Wings", price: 15.00, category: "Deep Fried", shop: "New Hong Kong Chinese Restaurant" },
  { id: 5, name: "Deep Fried Crab Claws (each)", price: 3.50, category: "Deep Fried", shop: "New Hong Kong Chinese Restaurant" },
  { id: 6, name: "Home-made Spring Rolls (each)", price: 3.50, category: "Deep Fried", shop: "New Hong Kong Chinese Restaurant" },
  { id: 7, name: "Mini Vegetable Spring Rolls (each)", price: 1.50, category: "Deep Fried", shop: "New Hong Kong Chinese Restaurant" },
  { id: 8, name: "Roast Spare Ribs", price: 14.00, category: "Deep Fried", shop: "New Hong Kong Chinese Restaurant" },
  { id: 9, name: "Steak Chinese Style", price: 24.50, category: "Beef", shop: "New Hong Kong Chinese Restaurant" },
  { id: 10, name: "Sliced Steak with Cashew Nuts", price: 17.00, category: "Beef", shop: "New Hong Kong Chinese Restaurant" },
  { id: 11, name: "Sliced Steak with Season Vegetables", price: 17.00, category: "Beef", shop: "New Hong Kong Chinese Restaurant" },
  { id: 12, name: "Sliced Steak with Black Bean Sauce", price: 14.50, category: "Beef", shop: "New Hong Kong Chinese Restaurant" },
  { id: 13, name: "Sliced Steak with Satay Sauce", price: 14.50, category: "Beef", shop: "New Hong Kong Chinese Restaurant" },
  { id: 14, name: "Sliced Steak with Curry Sauce", price: 14.50, category: "Beef", shop: "New Hong Kong Chinese Restaurant" },
  { id: 15, name: "Sliced Steak with Spring Onion & Ginger", price: 17.00, category: "Beef", shop: "New Hong Kong Chinese Restaurant" },
  { id: 16, name: "Sweet & Sour Steak", price: 17.00, category: "Beef", shop: "New Hong Kong Chinese Restaurant" },
  { id: 17, name: "Chicken with Cashew Nuts", price: 17.00, category: "Chicken", shop: "New Hong Kong Chinese Restaurant" },
  { id: 18, name: "Chicken with Season Vegetables", price: 14.50, category: "Chicken", shop: "New Hong Kong Chinese Restaurant" },
  { id: 19, name: "Chicken with Black Bean Sauce", price: 14.50, category: "Chicken", shop: "New Hong Kong Chinese Restaurant" },
  { id: 20, name: "Chicken with Satay Sauce", price: 14.50, category: "Chicken", shop: "New Hong Kong Chinese Restaurant" },
  { id: 21, name: "Chicken with Curry Sauce", price: 14.50, category: "Chicken", shop: "New Hong Kong Chinese Restaurant" },
  { id: 22, name: "Chicken with Spring Onion & Ginger", price: 17.00, category: "Chicken", shop: "New Hong Kong Chinese Restaurant" },
  { id: 23, name: "Chicken with Sweet & Sour Sauce", price: 15.00, category: "Chicken", shop: "New Hong Kong Chinese Restaurant" },
  { id: 24, name: "Lemon Chicken", price: 14.50, category: "Chicken", shop: "New Hong Kong Chinese Restaurant" },
  { id: 25, name: "Crispy Skin Chicken", price: 15.00, category: "Chicken", shop: "New Hong Kong Chinese Restaurant" },
  { id: 26, name: "Shrimps with Cashew Nuts", price: 19.00, category: "Shrimps/Prawns", shop: "New Hong Kong Chinese Restaurant" },
  { id: 27, name: "Shrimps with Satay Sauce", price: 16.50, category: "Shrimps/Prawns", shop: "New Hong Kong Chinese Restaurant" },
  { id: 28, name: "Shrimps with Curry Sauce", price: 16.50, category: "Shrimps/Prawns", shop: "New Hong Kong Chinese Restaurant" },
  { id: 29, name: "King Prawns with Season Vegetables", price: 23.50, category: "Shrimps/Prawns", shop: "New Hong Kong Chinese Restaurant" },
  { id: 30, name: "King Prawns with Satay Sauce", price: 23.50, category: "Shrimps/Prawns", shop: "New Hong Kong Chinese Restaurant" },
  { id: 31, name: "King Prawns with Curry Sauce", price: 23.50, category: "Shrimps/Prawns", shop: "New Hong Kong Chinese Restaurant" },
  { id: 32, name: "King Prawns with Cashew Nuts", price: 26.00, category: "Shrimps/Prawns", shop: "New Hong Kong Chinese Restaurant" },
  { id: 33, name: "Vegetarian Delight", price: 13.00, category: "Vegetarian", shop: "New Hong Kong Chinese Restaurant" },
  { id: 34, name: "Mushrooms, Bamboo Shoots & Cashew Nuts", price: 13.00, category: "Vegetarian", shop: "New Hong Kong Chinese Restaurant" },
  { id: 35, name: "Foo Young (Mushroom, Onion, Peas)", price: 12.50, category: "Omelette", shop: "New Hong Kong Chinese Restaurant" },
  { id: 36, name: "Chicken Foo Young", price: 13.50, category: "Omelette", shop: "New Hong Kong Chinese Restaurant" },
  { id: 37, name: "Sliced Steak Foo Young", price: 14.50, category: "Omelette", shop: "New Hong Kong Chinese Restaurant" },
  { id: 38, name: "Pork Foo Young", price: 14.50, category: "Omelette", shop: "New Hong Kong Chinese Restaurant" },
  { id: 39, name: "King Prawn Foo Young", price: 15.50, category: "Omelette", shop: "New Hong Kong Chinese Restaurant" },
  { id: 40, name: "Combination Foo Young", price: 16.00, category: "Omelette", shop: "New Hong Kong Chinese Restaurant" },
  { id: 41, name: "Shrimp Foo Young", price: 14.50, category: "Omelette", shop: "New Hong Kong Chinese Restaurant" },
  { id: 42, name: "Beef Chop Suey", price: 14.50, category: "Hot Dishes", shop: "New Hong Kong Chinese Restaurant" },
  { id: 43, name: "Bami Goreng (Noodles)", price: 16.00, category: "Hot Dishes", shop: "New Hong Kong Chinese Restaurant" },
  { id: 44, name: "Chicken with Chili Sauce", price: 15.00, category: "Hot Dishes", shop: "New Hong Kong Chinese Restaurant" },
  { id: 45, name: "Sliced Steak with Chilli Sauce", price: 15.00, category: "Hot Dishes", shop: "New Hong Kong Chinese Restaurant" },
  { id: 46, name: "Deep Fried Spicy Squid", price: 18.00, category: "Hot Dishes", shop: "New Hong Kong Chinese Restaurant" },
  { id: 47, name: "Chicken Fried Rice", price: 13.00, category: "Fried Rice", shop: "New Hong Kong Chinese Restaurant" },
  { id: 48, name: "Sliced Steak Fried Rice", price: 13.00, category: "Fried Rice", shop: "New Hong Kong Chinese Restaurant" },
  { id: 49, name: "Pork Fried Rice", price: 13.00, category: "Fried Rice", shop: "New Hong Kong Chinese Restaurant" },
  { id: 50, name: "Shrimp Fried Rice", price: 14.00, category: "Fried Rice", shop: "New Hong Kong Chinese Restaurant" },
];

export function NewHongKongComponent() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const selectedItemsRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const router = useRouter();

  const handleItemClick = (item: Omit<CartItem, 'quantity'>) => {
    addToCart(item);
  };

  const handleRemoveItem = (id: number, shop: string) => {
    removeFromCart(id, shop);
  };

  const scrollToSelectedItems = () => {
    selectedItemsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShopClick = (shop: string) => {
    let path = '/';
    if (shop === 'New Hong Kong Chinese Restaurant') {
      path = '/restaurant/new-hong-kong';
    } else if (shop === 'Gallipoli Turkish Restaurant') {
      path = '/restaurant/gallipoli';
    } else if (shop === 'Niko Niko Roll & Sushi') {
      path = '/restaurant/niko-niko-roll-and-sushi';
    } else if (shop === "Hot Chili's Italian Restaurant") {
      path = '/restaurant/hot-chilis';
    }
    router.push(path);
  };

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateOverallTotal = (groupedItems: Record<string, CartItem[]>) => {
    return Object.values(groupedItems).reduce((total, items) => total + calculateTotal(items), 0);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-16">
      <div className="container mx-auto p-3">
        <div className="bg-red-700 text-white p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-center">New Hong Kong Chinese Restaurant</h1>
          <div className="flex justify-center items-center mt-2">
            <p 
              className="text-sm sm:text-xl text-center cursor-pointer hover:underline"
              onClick={() => copyToClipboard("32-34 Richardson Street, Whakatane 3120")}
            >
              32-34 Richardson Street, Whakatane 3120
            </p>
            <Copy 
              size={16} 
              className="ml-2 cursor-pointer text-white" 
              onClick={() => copyToClipboard("32-34 Richardson Street, Whakatane 3120")}
            />
            {copySuccess && (
              <span className="ml-2 text-xs sm:text-sm text-yellow-300">Copied!</span>
            )}
          </div>
        </div>
        {categories.map(category => (
          <div key={category} className="mb-4">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full text-left text-xl font-bold mb-2 text-red-700 border-b-2 border-yellow-500 pb-2 flex justify-between items-center hover:bg-yellow-50 transition-colors rounded px-3 py-2"
              aria-expanded={expandedCategories.includes(category)}
            >
              {category}
              {expandedCategories.includes(category) ? (
                <ChevronUp className="text-red-700" size={24} />
              ) : (
                <ChevronDown className="text-red-700" size={24} />
              )}
            </button>
            {expandedCategories.includes(category) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {menuItems.filter(item => item.category === category).map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-100 p-3 rounded shadow cursor-pointer hover:bg-yellow-50 transition-colors border border-yellow-500"
                    onClick={() => handleItemClick(item)}
                  >
                    <h3 className="text-base font-bold text-black">{item.name}</h3>
                    <p className="text-red-700 font-bold text-sm">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={selectedItemsRef} className="mt-6 bg-gray-100 rounded-lg shadow-md p-6 mb-8 border-2 border-red-700">
          <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-red-700">
            <h2 className="text-2xl font-semibold text-red-700">Selected Items:</h2>
            <span className="text-xl font-semibold text-red-700">
              Cart Total: ${calculateOverallTotal(cart.reduce((acc, item) => {
                if (!acc[item.shop]) acc[item.shop] = [];
                acc[item.shop].push(item);
                return acc;
              }, {} as Record<string, CartItem[]>)).toFixed(2)}
            </span>
          </div>
          {Object.entries(cart.reduce((acc, item) => {
            if (!acc[item.shop]) acc[item.shop] = [];
            acc[item.shop].push(item);
            return acc;
          }, {} as Record<string, CartItem[]>)).map(([shop, items]) => (
            <div key={shop} className="mb-6">
              <h3 
                className="text-xl font-semibold text-blue-500 cursor-pointer hover:underline mb-2 pb-2 border-b border-gray-700"
                onClick={() => handleShopClick(shop)}
              >
                {shop}
              </h3>
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-800 py-2">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-black">
                      {item.name}
                    </h4>
                    <p className="text-gray-400">
                      ${item.price.toFixed(2)} each
                      {item.quantity > 1 && (
                        <span className="ml-2">
                          (${(item.price * item.quantity).toFixed(2)} total)
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(item.id, shop, item.quantity - 1)} className="text-gray-400 hover:text-gray-200">
                      <Minus size={18} />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="text-gray-400 hover:text-gray-200">
                      <Plus size={18} />
                    </button>
                    <button onClick={() => removeFromCart(item.id, shop)} className="ml-4 text-red-500 hover:text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-right">
                <span className="text-lg font-semibold text-red-700">
                  Total: ${calculateTotal(items).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4">
        <Link href="/cart">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded text-sm sm:text-base">
            View Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </Link>
      </div>
    </div>
  );
}