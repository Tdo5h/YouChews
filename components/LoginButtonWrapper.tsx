'use client'

import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LoginButtonWrapper() {
  const { status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on initial render
  }

  const buttonClasses = "px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 w-full text-center";

  return (
    <div className="absolute top-4 right-4">
      {status === "authenticated" ? (
        <Link href="/api/auth/signout">
          <button className={buttonClasses}>
            Sign out
          </button>
        </Link>
      ) : status === "unauthenticated" ? (
        <Link href="/login">
          <button className={buttonClasses}>
            Sign in
          </button>
        </Link>
      ) : (
        // Loading state
        <div className="w-20 h-10 bg-gray-300 rounded animate-pulse"></div>
      )}
    </div>
  );
}