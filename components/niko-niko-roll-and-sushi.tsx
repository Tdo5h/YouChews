'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ShoppingCart, RotateCcw, Copy } from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Crispy Chicken Roll", price: 18.50, description: "Avocado, Lettuce, Cream Cheese, Teriyaki Chicken, Breadcrumbs, Creamy Sauce" },
  { id: 2, name: "Kiwi Legend Roll", price: 18.50, description: "Avocado, Cream Cheese, Teriyaki Chicken, Pineapple, Breadcrumbs, Sweet Chilli Sauce" },
  { id: 3, name: "French Kiss Roll", price: 17.50, description: "Avocado, Cream Cheese, Salmon, Fried Prawns, Creamy Wasabi Sauce, Masago" },
  { id: 4, name: "Crunch Roll", price: 17.50, description: "Avocado, Fried Prawns, Crab meat, Creamy Wasabi Mayo, Katsu sauce, Breadcrumbs, Masago" },
  { id: 5, name: "Rainbow Roll", price: 18.50, description: "Avocado, Crab Meat, Salmon, Prawns, Creamy Wasabi Sauce" },
  { id: 6, name: "Salmon Roll", price: 18.40, description: "Salmon, Avocado, Crab Meat, Creamy Sauce" },
  { id: 7, name: "Eel Roll", price: 20.50, description: "Eel, Avocado, Crab Meat, Fried Prawns, Cream Sauce, Masago, Bonito Flake" },
  { id: 8, name: "Boss Roll", price: 18.50, description: "Avocado, Lettuce, Salmon, Crab Meat, Breadcrumbs, Tuna, Teriyaki Chicken, Hot Creamy Sauce, Katsu Sauce" },
  { id: 9, name: "Niko Niko Roll", price: 18.50, description: "Avocado, Cream Cheese, Tempura Chicken, Sweet Chilli Sauce, Wasabi Mayo, Spring Onions" },
  { id: 10, name: "Dynamite Roll", price: 17.50, description: "Lettuce, Carrot, Avocado, Capsicum, Breadcrumbs, Creamy Wasabi Sauce (Cream Cheese $0.50)" },
];

export function NikoNikoRollAndSushi() {
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [previousOrder, setPreviousOrder] = useState<MenuItem[]>([]);
  const [showButton, setShowButton] = useState(true);
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

  const scrollToSelectedItems = () => {
    selectedItemsRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
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

  return (
    <div className="min-h-screen bg-gray-900 font-sans pb-16">
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
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-bold text-center">Niko Niko Roll & Sushi</h1>
          <div className="flex justify-center items-center mt-2">
            <p 
              className="text-xl text-center cursor-pointer hover:underline"
              onClick={() => copyToClipboard("43 Kakahoroa Drive WHAKATANE 3120")}
            >
              43 Kakahoroa Drive WHAKATANE 3120
            </p>
            <Copy 
              size={18} 
              className="ml-2 cursor-pointer" 
              onClick={() => copyToClipboard("43 Kakahoroa Drive WHAKATANE 3120")}
            />
            {copySuccess && (
              <span className="ml-2 text-sm text-green-300">Copied!</span>
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
        <div ref={selectedItemsRef} className="mt-6 bg-gray-800 p-3 rounded shadow border-2 border-red-500">
          <h2 className="text-xl font-bold mb-3 text-red-400">Selected Items:</h2>
          <ul className="space-y-1.5">
            {selectedItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between border-b border-yellow-600 pb-2">
                <div>
                  <span className="font-bold text-sm text-yellow-300">{item.name}</span>
                  <span className="text-green-400 ml-1.5 text-xs">${item.price.toFixed(2)}</span>
                  <p className="text-xs text-gray-300">{item.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-400 hover:text-red-600"
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
              className="mt-3 bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded w-full text-sm"
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