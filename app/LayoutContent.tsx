'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home } from 'lucide-react';
import LoginButtonWrapper from '@/components/LoginButtonWrapper';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getIconButtonClasses = () => {
    const baseClasses = "p-2 border-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md";
    
    // Always use blue for the home button
    return `${baseClasses} border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white`;
  };

  const isHomePage = pathname === '/';

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <button className={getIconButtonClasses()} aria-label="Home">
            <Home size={24} />
          </button>
        </Link>
      </div>
      {isHomePage && (
        <div className="fixed top-4 right-4 z-50">
          <LoginButtonWrapper />
        </div>
      )}
      <main className="flex-grow">
        {children}
      </main>
    </>
  );
}