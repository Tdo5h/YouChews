'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Order = {
  id: string
  items: { name: string; quantity: number }[]
  total: number
}

export default function ShopOrders() {
  const params = useParams()
  const shopId = params?.shopId as string
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Here you would typically fetch orders from an API
    // For this example, we'll use mock data
    const mockOrders: Order[] = [
      {
        id: '1',
        items: [{ name: 'Item 1', quantity: 2 }, { name: 'Item 2', quantity: 1 }],
        total: 25.99
      },
      {
        id: '2',
        items: [{ name: 'Item 3', quantity: 1 }, { name: 'Item 4', quantity: 3 }],
        total: 35.50
      }
    ]
    setOrders(mockOrders)
  }, [shopId])

  return (
    <div className="min-h-screen bg-black text-blue-500 p-4">
      <h1 className="text-2xl mb-4">Orders for Shop {shopId}</h1>
      {orders.map(order => (
        <div key={order.id} className="mb-4 p-4 bg-gray-800 rounded">
          <h2 className="text-xl mb-2">Order #{order.id}</h2>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.name} x {item.quantity}</li>
            ))}
          </ul>
          <p className="mt-2">Total: ${order.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  )
}