'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ShoppingCart, RotateCcw, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  options: { name: string; price: number }[];
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Lamb Wrap Kebab", price: 10.00, category: "Wrap Kebab", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 2, name: "Chicken Wrap Kebab", price: 10.00, category: "Wrap Kebab", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 3, name: "Mixed Meats Wrap Kebab", price: 10.00, category: "Wrap Kebab", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 4, name: "Lamb Pita Pocket", price: 8.50, category: "Pita Pocket", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 5, name: "Chicken Pita Pocket", price: 8.50, category: "Pita Pocket", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 6, name: "Mixed Meats Pita Pocket", price: 9.00, category: "Pita Pocket", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 7, name: "Chicken Kebab Box", price: 8.50, category: "Kebab Box", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 8, name: "Lamb Kebab Box", price: 8.50, category: "Kebab Box", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 9, name: "Mixed Meats Kebab Box", price: 9.00, category: "Kebab Box", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 10, name: "Lamb Rice Dish-Iskender", price: 14.50, category: "Rice Dish-Iskender", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 11, name: "Chicken Rice Dish-Iskender", price: 14.50, category: "Rice Dish-Iskender", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 12, name: "Mixed Meats Rice Dish-Iskender", price: 14.50, category: "Rice Dish-Iskender", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 13, name: "Lamb Salad Dish", price: 14.50, category: "Salad Dishes", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 14, name: "Chicken Salad Dish", price: 14.50, category: "Salad Dishes", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 15, name: "Mixed Meats Salad Dish", price: 14.50, category: "Salad Dishes", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 16, name: "Chicken Meat on Chips", price: 14.50, category: "Meat on Chips", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 17, name: "Lamb Meat on Chips", price: 14.50, category: "Meat on Chips", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 18, name: "Mixed Meats on Chips", price: 14.50, category: "Meat on Chips", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 },
    { name: "Extra meat", price: 2 },
    { name: "Add falafel", price: 2 }
  ]},
  { id: 19, name: "Fries", price: 5.00, category: "Extras", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 2 }
  ]},
  { id: 20, name: "Baklava", price: 4.00, category: "Extras", options: [
    { name: "1 Piece", price: 0 },
    { name: "2 Pieces", price: 4 }
  ]},
  { id: 21, name: "Turkish Coffee", price: 4.00, category: "Extras", options: [
    { name: "Regular", price: 0 },
    { name: "Large", price: 1 }
  ]},
  { id: 22, name: "Apple Tea", price: 3.00, category: "Extras", options: [
    { name: "Hot", price: 0 },
    { name: "Iced", price: 0.5 }
  ]},
];

interface SelectedItem extends MenuItem {
  selectedOptions: { name: string; price: number }[];
}

export function GallipoliMenuComponent() {
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [previousOrder, setPreviousOrder] = useState<SelectedItem[]>([]);
  const [showButton, setShowButton] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const selectedItemsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    setExpandedItems(prev => 
      prev.includes(item.id) 
        ? prev.filter(id => id !== item.id) 
        : [...prev, item.id]
    );
  };

  const handleOptionChange = (item: MenuItem, option: { name: string; price: number }) => {
    setSelectedItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        let newOptions = existingItem.selectedOptions.filter(opt => 
          opt.name !== 'Regular' && opt.name !== 'Large'
        );
        if (option.name === 'Regular' || option.name === 'Large') {
          newOptions = [option, ...newOptions];
        } else {
          const optionIndex = newOptions.findIndex(opt => opt.name === option.name);
          if (optionIndex !== -1) {
            newOptions.splice(optionIndex, 1);
          } else {
            newOptions.push(option);
          }
        }
        updatedItems[existingItemIndex] = { ...existingItem, selectedOptions: newOptions };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, selectedOptions: [option] }];
      }
    });
  };

  const handleAddToOrder = (item: MenuItem) => {
    const selectedItem = selectedItems.find(i => i.id === item.id);
    if (selectedItem) {
      setTotal(prevTotal => {
        const itemTotal = selectedItem.price + selectedItem.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
        return prevTotal + itemTotal;
      });
      setExpandedItems(prev => prev.filter(id => id !== item.id));
    }
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(prevItems => {
      const newItems = [...prevItems];
      const removedItem = newItems.splice(index, 1)[0];
      const itemTotal = removedItem.price + removedItem.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
      setTotal(prevTotal => prevTotal - itemTotal);
      return newItems;
    });
  };

  const handleReorder = () => {
    if (previousOrder.length > 0) {
      setSelectedItems(previousOrder);
      setTotal(previousOrder.reduce((sum, item) => {
        const itemTotal = item.price + item.selectedOptions.reduce((optSum, opt) => optSum + opt.price, 0);
        return sum + itemTotal;
      }, 0));
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
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-bold text-center">Gallipoli Turkish Restaurant</h1>
          <div className="flex justify-center items-center mt-2">
            <p 
              className="text-xl text-center cursor-pointer hover:underline"
              onClick={() => copyToClipboard("80 King Street WHAKATANE 3120")}
            >
              80 King Street WHAKATANE 3120
            </p>
            <Copy 
              size={18} 
              className="ml-2 cursor-pointer" 
              onClick={() => copyToClipboard("80 King Street WHAKATANE 3120")}
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
                    <div
                      className="cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => handleItemClick(item)}
                    >
                      <h3 className="text-base font-bold text-white">{item.name}</h3>
                      <p className="text-green-400 font-bold text-sm">${item.price.toFixed(2)}</p>
                    </div>
                    {expandedItems.includes(item.id) && (
                      <div className="mt-2">
                        {item.options.map((option, index) => (
                          <div key={index} className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`${item.id}-${option.name}`}
                                checked={selectedItems.some(i => i.id === item.id && i.selectedOptions.some(opt => opt.name === option.name))}
                                onChange={() => handleOptionChange(item, option)}
                                className="mr-2"
                              />
                              <label htmlFor={`${item.id}-${option.name}`} className="text-sm text-white">{option.name}</label>
                            </div>
                            {option.price !== 0 && (
                              <span className="text-xs text-green-400">
                                {option.price > 0 ? `+$${option.price.toFixed(2)}` : `-$${Math.abs(option.price).toFixed(2)}`}
                              </span>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => handleAddToOrder(item)}
                          className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs w-full"
                        >
                          Add to Order
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={selectedItemsRef} className="mt-6 bg-gray-800 p-3 rounded shadow border-2 border-green-500">
          <h2 className="text-xl font-bold mb-3 text-yellow-400">Selected Items:</h2>
          <ul className="space-y-1.5">
            {selectedItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between border-b border-green-500 pb-2">
                <div>
                  <span className="font-bold text-sm text-white">{item.name}</span>
                  <span className="text-green-400 ml-1.5 text-xs">
                    ${(item.price + item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0)).toFixed(2)}
                  </span>
                  <p className="text-xs text-gray-400">
                    {item.selectedOptions.map(opt => `${opt.name}${opt.price !== 0 ? ` (+$${opt.price.toFixed(2)})` : ''}`).join(', ')}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-600"
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
              className="mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded w-full text-sm"
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