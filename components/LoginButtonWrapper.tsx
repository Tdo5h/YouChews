'use client'

import { useSession, signIn, signOut } from 'next-auth/react';
import { UserPlus, LogOut } from 'lucide-react';
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

  const buttonClasses = "p-2 bg-transparent border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105";

  return (
    <div>
      {status === "authenticated" ? (
        <button onClick={() => signOut()} className={buttonClasses} aria-label="Sign out">
          <LogOut size={24} />
        </button>
      ) : status === "unauthenticated" ? (
        <button onClick={() => signIn()} className={buttonClasses} aria-label="Sign in">
          <UserPlus size={24} />
        </button>
      ) : (
        // Loading state
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}