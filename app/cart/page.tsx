'use client'

import React, { useState } from 'react';
import { Trash2, Plus, Minus, CreditCard, Apple } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  shop: string;
  quantity: number;
  description?: string;
}

interface GroupedCartItems {
  [key: string]: CartItem[];
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [chefComments, setChefComments] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();

  const groupedItems = cart.reduce((acc, item) => {
    if (!acc[item.shop]) acc[item.shop] = [];
    acc[item.shop].push(item);
    return acc;
  }, {} as GroupedCartItems);

  const shopCount = Object.keys(groupedItems).length;

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateOverallTotal = () => {
    return Object.values(groupedItems).reduce((total, items) => total + calculateTotal(items), 0);
  };

  const handleRemoveItem = (id: number, shop: string) => {
    removeFromCart(id, shop);
  };

  const handleQuantityChange = (id: number, shop: string, change: number) => {
    const item = cart.find(i => i.id === id && i.shop === shop);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(id, shop, newQuantity);
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

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const MockStripeCheckout = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <div className="mb-4">
          <button className="w-full bg-black text-white py-2 px-4 rounded flex items-center justify-center">
            <Apple className="mr-2" /> Pay with Apple Pay
          </button>
        </div>
        <div className="mb-4">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center">
            <CreditCard className="mr-2" /> Pay with Card
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center">
          This is a mock checkout page for demonstration purposes.
        </p>
        <button 
          onClick={() => setShowCheckout(false)} 
          className="mt-4 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white py-4 sm:py-8">
      <div className="container mx-auto px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Your Cart</h1>
        {shopCount === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty</p>
        ) : (
          <>
            {Object.entries(groupedItems).map(([shop, items]) => (
              <div key={shop} className="bg-gray-900 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-8">
                <h2 
                  className="text-xl sm:text-2xl font-semibold text-blue-400 cursor-pointer hover:underline mb-4"
                  onClick={() => handleShopClick(shop)}
                >
                  {shop}
                </h2>
                {items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-800 py-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-gray-400">
                        ${item.price.toFixed(2)} each
                        {item.quantity > 1 && (
                          <span className="ml-2">
                            (${(item.price * item.quantity).toFixed(2)} total)
                          </span>
                        )}
                      </p>
                      {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => handleQuantityChange(item.id, shop, -1)} className="text-gray-400 hover:text-gray-200">
                        <Minus size={18} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, shop, 1)} className="text-gray-400 hover:text-gray-200">
                        <Plus size={18} />
                      </button>
                      <button onClick={() => handleRemoveItem(item.id, shop)} className="ml-4 text-red-500 hover:text-red-400">
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
            <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Special Instructions</h2>
              <textarea
                value={chefComments}
                onChange={(e) => setChefComments(e.target.value)}
                placeholder="Add any special instructions for the chef here..."
                className="w-full h-32 p-2 border rounded bg-gray-800 text-white border-gray-700"
              ></textarea>
            </div>
            {shopCount > 1 && (
              <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Overall Total:</h2>
                  <span className="text-2xl font-bold text-red-600">
                    ${calculateOverallTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            )}
            <div className="bg-gray-900 rounded-lg shadow-md p-6">
              <button onClick={handleCheckout} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
        <div className="mt-4 sm:mt-8 text-center">
          <Link href="/" className="text-blue-400 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
      {showCheckout && <MockStripeCheckout />}
    </div>
  );
}