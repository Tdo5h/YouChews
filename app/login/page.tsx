'use client'

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Choose Your Login Method</h1>
        <div className="space-y-4">
          <button 
            onClick={() => handleSignIn('google')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with Google
          </button>
          <button 
            onClick={() => alert('Apple sign-in not implemented yet')}
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with Apple
          </button>
          <button 
            onClick={() => alert('Facebook sign-in not implemented yet')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with Facebook
          </button>
          <button 
            onClick={() => alert('Manual sign-in not implemented yet')}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Manual Sign In
          </button>
        </div>
      </div>
    </div>
  );
}