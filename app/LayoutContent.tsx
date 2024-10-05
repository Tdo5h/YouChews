'use client'

import Link from 'next/link';
import { Home, ShoppingCart, LogIn } from 'lucide-react';
import { useEffect } from 'react';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Remove the build watcher elements
    const elements = document.querySelectorAll('#__next-build-watcher');
    elements.forEach(el => el.remove());
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-black text-white">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-lg">Home</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-blue-500" />
            <span>Cart</span>
          </Link>
          <Link href="/login" className="flex items-center space-x-2">
            <LogIn className="w-6 h-6 text-blue-500" />
            <span>Login</span>
          </Link>
        </div>
      </nav>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </>
  );
}