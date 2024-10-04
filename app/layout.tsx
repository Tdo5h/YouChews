'use client'

import { usePathname } from 'next/navigation';
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from './AuthProvider'
import Link from 'next/link';
import { Home } from 'lucide-react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const getIconButtonClasses = () => {
    const baseClasses = "p-2 border-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105";
    
    if (pathname?.includes('/restaurant/new-hong-kong')) {
      return `${baseClasses} bg-transparent border-red-700 text-red-700 hover:bg-red-700 hover:text-white`;
    } else if (pathname?.includes('/restaurant/gallipoli')) {
      return `${baseClasses} bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-white`;
    } else if (pathname?.includes('/restaurant/niko-niko-roll-and-sushi')) {
      return `${baseClasses} bg-transparent border-red-600 text-red-600 hover:bg-red-600 hover:text-white`;
    } else if (pathname?.includes('/restaurant/hot-chilis')) {
      return `${baseClasses} bg-transparent border-[#F4B860] text-[#F4B860] hover:bg-[#F4B860] hover:text-[#2B1D16]`;
    } else {
      // Default style (for home page and any other pages)
      return `${baseClasses} bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white`;
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <AuthProvider>
          <div className="fixed top-4 left-4 z-50">
            <Link href="/">
              <button className={getIconButtonClasses()} aria-label="Home">
                <Home size={24} />
              </button>
            </Link>
          </div>
          <main className="pb-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
