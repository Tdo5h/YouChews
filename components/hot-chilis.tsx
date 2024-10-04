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
  { id: 1, name: "Fried Ravioli", price: 5.80, category: "Starters", shop: "Hot Chili's Italian Restaurant" },
  { id: 2, name: "Calamari", price: 8.98, category: "Starters", shop: "Hot Chili's Italian Restaurant" },
  { id: 3, name: "Eggplant Bites", price: 4.92, category: "Starters", shop: "Hot Chili's Italian Restaurant" },
  { id: 4, name: "Fried Green Beans", price: 7.50, category: "Starters", shop: "Hot Chili's Italian Restaurant" },
  { id: 5, name: "Zucchini Fries", price: 9.20, category: "Starters", shop: "Hot Chili's Italian Restaurant" },
  { id: 6, name: "Grilled Italian Chicken", price: 8.98, category: "Sandwiches", shop: "Hot Chili's Italian Restaurant" },
  { id: 7, name: "Philly Steak Sub", price: 4.92, category: "Sandwiches", shop: "Hot Chili's Italian Restaurant" },
  { id: 8, name: "Pescaraz Club", price: 7.50, category: "Sandwiches", shop: "Hot Chili's Italian Restaurant" },
  { id: 9, name: "Grilled Cheese", price: 9.20, category: "Sandwiches", shop: "Hot Chili's Italian Restaurant" },
  { id: 10, name: "Tortellini", price: 9.20, category: "Pasta", shop: "Hot Chili's Italian Restaurant" },
  { id: 11, name: "Coscia Fettuccine", price: 8.50, category: "Pasta", shop: "Hot Chili's Italian Restaurant" },
  { id: 12, name: "Preslianna Special", price: 4.53, category: "Pasta", shop: "Hot Chili's Italian Restaurant" },
  { id: 13, name: "Vegetable Pasta", price: 6.25, category: "Pasta", shop: "Hot Chili's Italian Restaurant" },
  { id: 14, name: "Fettuccine Alfredo", price: 9.50, category: "Pasta", shop: "Hot Chili's Italian Restaurant" },
  { id: 15, name: "Italian Pasta", price: 5.80, category: "Pasta", shop: "Hot Chili's Italian Restaurant" },
  { id: 16, name: "Spagheti Sisco", price: 6.10, category: "Pasta", shop: "Hot Chili's Italian Restaurant" },
  { id: 17, name: "Lopez Special", price: 7.70, category: "Pasta", shop: "Hot Chili's Italian Restaurant" },
];


export function HotChilisComponent() {
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
    <div className="min-h-screen bg-[#2B1D16] text-[#F4B860] font-sans pb-16">
      <div className="container mx-auto p-3">
        <div className="bg-[#F4B860] text-[#2B1D16] p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-center">Hot Chili's Italian Restaurant</h1>
          <div className="flex justify-center items-center mt-2">
            <p 
              className="text-sm sm:text-xl text-center cursor-pointer hover:underline"
              onClick={() => copyToClipboard("Hot Chili's Italian Restaurant Address")}
            >
              Hot Chili's Italian Restaurant Address
            </p>
            <Copy 
              size={16} 
              className="ml-2 cursor-pointer text-[#2B1D16]" 
              onClick={() => copyToClipboard("Hot Chili's Italian Restaurant Address")}
            />
            {copySuccess && (
              <span className="ml-2 text-xs sm:text-sm text-[#2B1D16]">Copied!</span>
            )}
          </div>
        </div>
        {categories.map(category => (
          <div key={category} className="mb-4">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full text-left text-xl font-bold mb-2 text-[#F4B860] border-b-2 border-[#F4B860] pb-2 flex justify-between items-center hover:bg-[#3D2B20] transition-colors rounded px-3 py-2"
              aria-expanded={expandedCategories.includes(category)}
            >
              {category}
              {expandedCategories.includes(category) ? (
                <ChevronUp className="text-[#F4B860]" size={24} />
              ) : (
                <ChevronDown className="text-[#F4B860]" size={24} />
              )}
            </button>
            {expandedCategories.includes(category) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {menuItems.filter(item => item.category === category).map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#3D2B20] p-3 rounded shadow cursor-pointer hover:bg-[#4D3B30] transition-colors border border-[#F4B860]"
                    onClick={() => handleItemClick(item)}
                  >
                    <h3 className="text-base font-bold text-[#F4B860]">{item.name}</h3>
                    <p className="text-[#F4B860] font-bold text-sm">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={selectedItemsRef} className="mt-6 bg-[#3D2B20] rounded-lg shadow-md p-6 mb-8 border-2 border-[#F4B860]">
          <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-[#F4B860]">
            <h2 className="text-2xl font-semibold text-[#F4B860]">Selected Items:</h2>
            <span className="text-xl font-semibold text-[#F4B860]">
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
                className={`text-xl font-semibold cursor-pointer hover:underline mb-2 pb-2 border-b border-[#F4B860] ${
                  shop === "Hot Chili's Italian Restaurant" ? 'text-[#F4B860]' : 'text-blue-500'
                }`}
                onClick={() => handleShopClick(shop)}
              >
                {shop}
              </h3>
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-[#F4B860] py-2">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[#F4B860]">
                      {item.name}
                    </h4>
                    <p className="text-[#F4B860]">
                      ${item.price.toFixed(2)} each
                      {item.quantity > 1 && (
                        <span className="ml-2">
                          (${(item.price * item.quantity).toFixed(2)} total)
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-[#F4B860]">{item.category}</p>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(item.id, shop, item.quantity - 1)} className="text-[#F4B860] hover:text-[#F4B860]">
                      <Minus size={18} />
                    </button>
                    <span className="mx-2 text-[#F4B860]">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="text-[#F4B860] hover:text-[#F4B860]">
                      <Plus size={18} />
                    </button>
                    <button onClick={() => removeFromCart(item.id, shop)} className="ml-4 text-red-500 hover:text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-right">
                <span className="text-lg font-semibold text-[#F4B860]">
                  Total: ${calculateTotal(items).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4">
        <Link href="/cart">
          <button className="bg-[#F4B860] hover:bg-[#F5C982] text-[#2B1D16] font-bold py-1 px-2 sm:py-2 sm:px-4 rounded text-sm sm:text-base">
            View Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </Link>
      </div>
    </div>
  );
}