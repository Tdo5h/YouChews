'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
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
  const [showButton, setShowButton] = useState(true);
  const selectedItemsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-gray-100 font-sans pb-20">
      <div className="fixed top-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img src="/placeholder.svg?height=40&width=120" alt="You Chews Logo" className="h-10 cursor-pointer" />
          </Link>
        </div>
        <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
        <button
          onClick={() => {
            setTotal(0);
            setSelectedItems([]);
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
      <div className="container mx-auto pt-20 p-4">
        <h1 className="text-4xl font-bold mb-6 text-red-600">NIKO NIKO ROLL & SUSHI</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleItemClick(item)}
            >
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-800 font-bold">${item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
        <div ref={selectedItemsRef} className="mt-8 bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-red-600">SELECTED ITEMS:</h2>
          <ul className="space-y-2">
            {selectedItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  <span className="font-bold">{item.name}</span>
                  <span className="text-gray-600 ml-2">${item.price.toFixed(2)}</span>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div 
        ref={buttonRef}
        className={`fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-center items-center z-10 transition-opacity duration-300 ${
          showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToSelectedItems}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <ShoppingCart className="mr-2" size={20} />
          Selected Items ({selectedItems.length})
        </button>
      </div>
    </div>
  );
}