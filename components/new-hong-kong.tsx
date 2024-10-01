'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ShoppingCart, RotateCcw, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Won Ton with Sweet & Sour Sauce", price: 7.50, category: "Deep Fried" },
  { id: 2, name: "Chicken Nuggets with Sweet & Sour Sauce", price: 14.00, category: "Deep Fried" },
  { id: 3, name: "Prawn Balls with Sweet & Sour Sauce", price: 15.00, category: "Deep Fried" },
  { id: 4, name: "Deep Fried Chicken Wings", price: 15.00, category: "Deep Fried" },
  { id: 5, name: "Deep Fried Crab Claws (each)", price: 3.50, category: "Deep Fried" },
  { id: 6, name: "Home-made Spring Rolls (each)", price: 3.50, category: "Deep Fried" },
  { id: 7, name: "Mini Vegetable Spring Rolls (each)", price: 1.50, category: "Deep Fried" },
  { id: 8, name: "Roast Spare Ribs", price: 14.00, category: "Deep Fried" },
  { id: 9, name: "Steak Chinese Style", price: 24.50, category: "Beef" },
  { id: 10, name: "Sliced Steak with Cashew Nuts", price: 17.00, category: "Beef" },
  { id: 11, name: "Sliced Steak with Season Vegetables", price: 17.00, category: "Beef" },
  { id: 12, name: "Sliced Steak with Black Bean Sauce", price: 14.50, category: "Beef" },
  { id: 13, name: "Sliced Steak with Satay Sauce", price: 14.50, category: "Beef" },
  { id: 14, name: "Sliced Steak with Curry Sauce", price: 14.50, category: "Beef" },
  { id: 15, name: "Sliced Steak with Spring Onion & Ginger", price: 17.00, category: "Beef" },
  { id: 16, name: "Sweet & Sour Steak", price: 17.00, category: "Beef" },
  { id: 17, name: "Chicken with Cashew Nuts", price: 17.00, category: "Chicken" },
  { id: 18, name: "Chicken with Season Vegetables", price: 14.50, category: "Chicken" },
  { id: 19, name: "Chicken with Black Bean Sauce", price: 14.50, category: "Chicken" },
  { id: 20, name: "Chicken with Satay Sauce", price: 14.50, category: "Chicken" },
  { id: 21, name: "Chicken with Curry Sauce", price: 14.50, category: "Chicken" },
  { id: 22, name: "Chicken with Spring Onion & Ginger", price: 17.00, category: "Chicken" },
  { id: 23, name: "Chicken with Sweet & Sour Sauce", price: 15.00, category: "Chicken" },
  { id: 24, name: "Lemon Chicken", price: 14.50, category: "Chicken" },
  { id: 25, name: "Crispy Skin Chicken", price: 15.00, category: "Chicken" },
  { id: 26, name: "Shrimps with Cashew Nuts", price: 19.00, category: "Shrimps/Prawns" },
  { id: 27, name: "Shrimps with Satay Sauce", price: 16.50, category: "Shrimps/Prawns" },
  { id: 28, name: "Shrimps with Curry Sauce", price: 16.50, category: "Shrimps/Prawns" },
  { id: 29, name: "King Prawns with Season Vegetables", price: 23.50, category: "Shrimps/Prawns" },
  { id: 30, name: "King Prawns with Satay Sauce", price: 23.50, category: "Shrimps/Prawns" },
  { id: 31, name: "King Prawns with Curry Sauce", price: 23.50, category: "Shrimps/Prawns" },
  { id: 32, name: "King Prawns with Cashew Nuts", price: 26.00, category: "Shrimps/Prawns" },
  { id: 33, name: "Vegetarian Delight", price: 13.00, category: "Vegetarian" },
  { id: 34, name: "Mushrooms, Bamboo Shoots & Cashew Nuts", price: 13.00, category: "Vegetarian" },
  { id: 35, name: "Foo Young (Mushroom, Onion, Peas)", price: 12.50, category: "Omelette" },
  { id: 36, name: "Chicken Foo Young", price: 13.50, category: "Omelette" },
  { id: 37, name: "Sliced Steak Foo Young", price: 14.50, category: "Omelette" },
  { id: 38, name: "Pork Foo Young", price: 14.50, category: "Omelette" },
  { id: 39, name: "King Prawn Foo Young", price: 15.50, category: "Omelette" },
  { id: 40, name: "Combination Foo Young", price: 16.00, category: "Omelette" },
  { id: 41, name: "Shrimp Foo Young", price: 14.50, category: "Omelette" },
  { id: 42, name: "Beef Chop Suey", price: 14.50, category: "Hot Dishes" },
  { id: 43, name: "Bami Goreng (Noodles)", price: 16.00, category: "Hot Dishes" },
  { id: 44, name: "Chicken with Chili Sauce", price: 15.00, category: "Hot Dishes" },
  { id: 45, name: "Sliced Steak with Chilli Sauce", price: 15.00, category: "Hot Dishes" },
  { id: 46, name: "Deep Fried Spicy Squid", price: 18.00, category: "Hot Dishes" },
  { id: 47, name: "Chicken Fried Rice", price: 13.00, category: "Fried Rice" },
  { id: 48, name: "Sliced Steak Fried Rice", price: 13.00, category: "Fried Rice" },
  { id: 49, name: "Pork Fried Rice", price: 13.00, category: "Fried Rice" },
  { id: 50, name: "Shrimp Fried Rice", price: 14.00, category: "Fried Rice" },
];

export function NewHongKongComponent() {
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [previousOrder, setPreviousOrder] = useState<MenuItem[]>([]);
  const [showButton, setShowButton] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const selectedItemsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    setTotal((prevTotal) => prevTotal + item.price);
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveItem = (index: number) => {
    setTotal((prevTotal) => prevTotal - selectedItems[index].price);
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleReorder = () => {
    if (previousOrder.length > 0) {
      setSelectedItems(previousOrder);
      setTotal(previousOrder.reduce((sum, item) => sum + item.price, 0));
    }
  };

  const handlePlaceOrder = () => {
    setPreviousOrder(selectedItems);
    setSelectedItems([]);
    setTotal(0);
    alert('Order placed successfully!');
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

  useEffect(() => {
    const handleScroll = () => {
      if (selectedItemsRef.current && buttonRef.current) {
        const selectedItemsRect = selectedItemsRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setShowButton(selectedItemsRect.top > buttonRect.bottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-16">
      <div className="fixed top-0 left-0 right-0 bg-black text-white p-3 flex justify-between items-center z-10">
        <Link href="/" className="flex items-center space-x-3">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/youchews%20icon-cu9J4NCQm5DqTYGZmkxtDoXVONI58M.png" 
            alt="YouChews Logo" 
            className="h-7"
          />
        </Link>
        <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
        <button
          onClick={handleReorder}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1.5 px-3 rounded flex items-center text-sm"
          disabled={previousOrder.length === 0}
        >
          <RotateCcw className="mr-1.5" size={15} />
          Reorder
        </button>
      </div>
      <div className="container mx-auto pt-16 p-3">
        <div className="bg-red-700 text-white p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-bold text-center">New Hong Kong Chinese Restaurant</h1>
          <div className="flex justify-center items-center mt-2">
            <p 
              className="text-xl text-center cursor-pointer hover:underline"
              onClick={() => copyToClipboard("32-34 Richardson Street, Whakatane 3120")}
            >
              32-34 Richardson Street, Whakatane 3120
            </p>
            <Copy 
              size={18} 
              className="ml-2 cursor-pointer text-white" 
              onClick={() => copyToClipboard("32-34 Richardson Street, Whakatane 3120")}
            />
            {copySuccess && (
              <span className="ml-2 text-sm text-yellow-300">Copied!</span>
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
                    className="bg-white p-3 rounded shadow cursor-pointer hover:bg-yellow-50 transition-colors border border-yellow-500"
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
        <div ref={selectedItemsRef} className="mt-6 bg-white p-3 rounded shadow border-2 border-red-700">
          <h2 className="text-xl font-bold mb-3 text-red-700">Selected Items:</h2>
          <ul className="space-y-1.5">
            {selectedItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between border-b border-yellow-500 pb-2">
                <div>
                  <span className="font-bold text-sm text-black">{item.name}</span>
                  <span className="text-red-700 ml-1.5 text-xs">${item.price.toFixed(2)}</span>
                  <p className="text-xs text-gray-600">{item.category}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>
          {selectedItems.length > 0 && (
            <button
              onClick={handlePlaceOrder}
              className="mt-3 bg-red-700 hover:bg-red-800 text-white font-bold py-1.5 px-3 rounded w-full text-sm"
            >
              Place Order
            </button>
          )}
        </div>
      </div>
      <div 
        ref={buttonRef}
        className={`fixed bottom-0 left-0 right-0 bg-black text-white p-3 flex justify-center items-center z-10 transition-opacity duration-300 ${
          showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToSelectedItems}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1.5 px-3 rounded flex items-center text-sm"
        >
          <ShoppingCart className="mr-1.5" size={15} />
          Selected Items ({selectedItems.length})
        </button>
      </div>
    </div>
  );
}