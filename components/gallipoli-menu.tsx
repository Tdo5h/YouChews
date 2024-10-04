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
  quantity: number;
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Lamb Wrap Kebab", price: 10.00, category: "Wrap Kebab", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 2, name: "Chicken Wrap Kebab", price: 10.00, category: "Wrap Kebab", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 3, name: "Mixed Meats Wrap Kebab", price: 10.00, category: "Wrap Kebab", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 4, name: "Lamb Pita Pocket", price: 8.50, category: "Pita Pocket", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 5, name: "Chicken Pita Pocket", price: 8.50, category: "Pita Pocket", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 6, name: "Mixed Meats Pita Pocket", price: 9.00, category: "Pita Pocket", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 7, name: "Chicken Kebab Box", price: 8.50, category: "Kebab Box", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 8, name: "Lamb Kebab Box", price: 8.50, category: "Kebab Box", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 9, name: "Mixed Meats Kebab Box", price: 9.00, category: "Kebab Box", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 10, name: "Lamb Rice Dish-Iskender", price: 14.50, category: "Rice Dish-Iskender", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 11, name: "Chicken Rice Dish-Iskender", price: 14.50, category: "Rice Dish-Iskender", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 12, name: "Mixed Meats Rice Dish-Iskender", price: 14.50, category: "Rice Dish-Iskender", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 13, name: "Lamb Salad Dish", price: 14.50, category: "Salad Dishes", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 14, name: "Chicken Salad Dish", price: 14.50, category: "Salad Dishes", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 15, name: "Mixed Meats Salad Dish", price: 14.50, category: "Salad Dishes", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 16, name: "Chicken Meat on Chips", price: 14.50, category: "Meat on Chips", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 17, name: "Lamb Meat on Chips", price: 14.50, category: "Meat on Chips", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 18, name: "Mixed Meats on Chips", price: 14.50, category: "Meat on Chips", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 19, name: "Fries", price: 5.00, category: "Extras", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 20, name: "Baklava", price: 4.00, category: "Extras", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 21, name: "Turkish Coffee", price: 4.00, category: "Extras", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
  { id: 22, name: "Apple Tea", price: 3.00, category: "Extras", shop: "Gallipoli Turkish Restaurant", quantity: 0 },
];

export function GallipoliMenuComponent() {
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateOverallTotal = (groupedItems: Record<string, CartItem[]>) => {
    return Object.values(groupedItems).reduce((total, items) => total + calculateTotal(items), 0);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-16">
      <div className="container mx-auto p-3">
        <div className="bg-green-600 text-white p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-center">Gallipoli Turkish Restaurant</h1>
          <div className="flex justify-center items-center mt-2">
            <p 
              className="text-sm sm:text-xl text-center cursor-pointer hover:underline"
              onClick={() => copyToClipboard("80 King Street WHAKATANE 3120")}
            >
              80 King Street WHAKATANE 3120
            </p>
            <Copy 
              size={16} 
              className="ml-2 cursor-pointer" 
              onClick={() => copyToClipboard("80 King Street WHAKATANE 3120")}
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
              className="w-full text-left text-xl font-bold mb-2 text-yellow-400 border-b-2 border-green-500 pb-2 flex justify-between items-center hover:bg-gray-800 transition-colors rounded px-3 py-2"
              aria-expanded={expandedCategories.includes(category)}
            >
              {category}
              {expandedCategories.includes(category) ? (
                <ChevronUp className="text-yellow-400" size={24} />
              ) : (
                <ChevronDown className="text-yellow-400" size={24} />
              )}
            </button>
            {expandedCategories.includes(category) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {menuItems.filter(item => item.category === category).map((item) => (
                  <div key={item.id} className="bg-gray-800 p-3 rounded shadow border border-green-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-bold text-white">{item.name}</h3>
                        <p className="text-green-400 font-bold text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => handleItemClick(item)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={selectedItemsRef} className="mt-6 bg-gray-900 rounded-lg shadow-md p-6 mb-8 border-2 border-green-500">
          <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-green-500">
            <h2 className="text-2xl font-semibold text-green-400">Selected Items:</h2>
            <span className="text-xl font-semibold text-green-400">
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
                    <h4 className="text-lg font-semibold text-white">
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
                <span className="text-lg font-semibold text-green-500">
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