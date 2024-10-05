'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ShopLogin() {
  const [shopId, setShopId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the shopId and password
    // For this example, we'll just redirect to a shop orders page
    router.push(`/shop-orders/${shopId}`)
  }

  return (
    <div className="min-h-screen bg-black text-blue-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4">Shop Login</h1>
      <form onSubmit={handleLogin} className="w-full max-w-xs">
        <input
          type="text"
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
          placeholder="Shop ID"
          className="w-full p-2 mb-4 bg-gray-800 text-blue-500 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-800 text-blue-500 rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-black rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  )
}