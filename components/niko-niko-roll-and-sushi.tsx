'use client'

import React, { useState, useRef } from 'react';
import { Trash2, Copy, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, CartItem } from '@/hooks/useCart';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  shop: string;
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Crispy Chicken Roll", price: 18.50, description: "Avocado, Lettuce, Cream Cheese, Teriyaki Chicken, Breadcrumbs, Creamy Sauce", category: "Rolls", shop: "Niko Niko Roll & Sushi" },
  { id: 2, name: "Kiwi Legend Roll", price: 18.50, description: "Avocado, Cream Cheese, Teriyaki Chicken, Pineapple, Breadcrumbs, Sweet Chilli Sauce", category: "Rolls", shop: "Niko Niko Roll & Sushi" },
  { id: 3, name: "French Kiss Roll", price: 17.50, description: "Avocado, Cream Cheese, Salmon, Fried Prawns, Creamy Wasabi Sauce, Masago", category: "Rolls", shop: "Niko Niko Roll & Sushi" },
  { id: 4, name: "Crunch Roll", price: 17.50, description: "Avocado, Fried Prawns, Crab meat, Creamy Wasabi Mayo, Katsu sauce, Breadcrumbs, Masago", category: "Rolls", shop: "Niko Niko Roll & Sushi" },
  { id: 5, name: "Rainbow Roll", price: 18.50, description: "Avocado, Crab Meat, Salmon, Prawns, Creamy Wasabi Sauce", category: "Rolls", shop: "Niko Niko Roll & Sushi" },
  { id: 6, name: "Salmon Roll", price: 18.40, description: "Salmon, Avocado, Crab Meat, Creamy Sauce", category: "Rolls", shop: "Niko Niko Roll & Sushi" },
  { id: 7, name: "Eel Roll", price: 20.50, description: "Eel, Avocado, Crab Meat, Fried Prawns, Cream Sauce, Masago, Bonito Flake", category: "Rolls", shop: "Niko Niko Roll & Sushi" },
  { id: 8, name: "Boss Roll", price: 18.50, description: "Avocado, Lettuce, Salmon, Crab Meat, Breadcrumbs, Tuna, Teriyaki Chicken, Hot Creamy Sauce, Katsu Sauce", category: "Rolls", shop: "Niko Niko Roll & Sushi" },
  { id: 9, name: "Niko Niko Roll", price: 18.50, description: "Avocado, Cream Cheese, Tempura Chicken, Sweet Chilli Sauce, Wasabi Mayo, Spring Onions", category: "Rolls", shop: "Niko Niko Roll & Sushi" },
  { id: 10, name: "Dynamite Roll", price: 17.50, description: "Lettuce, Carrot, Avocado, Capsicum, Breadcrumbs, Creamy Wasabi Sauce (Cream Cheese $0.50)", category: "Rolls", shop: "Niko Niko Roll & Sushi" },
];


export function NikoNikoRollAndSushi() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const selectedItemsRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const router = useRouter();

  const handleItemClick = (item: MenuItem) => {
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateOverallTotal = (groupedItems: Record<string, CartItem[]>) => {
    return Object.values(groupedItems).reduce((total, items) => total + calculateTotal(items), 0);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-16">
      <div className="container mx-auto p-3">
        <div className="bg-red-600 text-white p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-center">Niko Niko Roll & Sushi</h1>
          <div className="flex justify-center items-center mt-2">
            <p 
              className="text-sm sm:text-xl text-center cursor-pointer hover:underline"
              onClick={() => copyToClipboard("43 Kakahoroa Drive WHAKATANE 3120")}
            >
              43 Kakahoroa Drive WHAKATANE 3120
            </p>
            <Copy 
              size={16} 
              className="ml-2 cursor-pointer" 
              onClick={() => copyToClipboard("43 Kakahoroa Drive WHAKATANE 3120")}
            />
            {copySuccess && (
              <span className="ml-2 text-xs sm:text-sm text-green-300">Copied!</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 p-3 rounded shadow cursor-pointer hover:bg-gray-700 transition-colors border border-yellow-400"
              onClick={() => handleItemClick(item)}
            >
              <h3 className="text-base font-bold text-yellow-300">{item.name}</h3>
              <p className="text-green-400 font-bold text-sm">${item.price.toFixed(2)}</p>
              <p className="text-xs text-gray-300 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
        <div ref={selectedItemsRef} className="mt-6 bg-gray-900 rounded-lg shadow-md p-6 mb-8 border-2 border-red-600">
          <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-red-600">
            <h2 className="text-2xl font-semibold text-red-600">Selected Items:</h2>
            <span className="text-xl font-semibold text-red-600">
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
                    <h4 className="text-lg font-semibold text-yellow-300">
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
                <span className="text-lg font-semibold text-red-600">
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