'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'; // Importing Link from Next.js

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: { small: number; large: number };
  options: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 'kebab',
    name: 'KEBAB',
    description: 'Your choice of fresh meat & salads topped with any two sauces in a warm pita bread.',
    price: { small: 16.96, large: 19.08 },
    options: ['Chicken', 'Lamb', 'Mixed (Chicken & Lamb)', 'Falafel (Vege)']
  },
  {
    id: 'meat-on-chips',
    name: 'MEAT ON CHIPS',
    description: 'Your choice of fresh meat & salads topped with any combination of two sauces served with chips.',
    price: { small: 20.14, large: 24.38 },
    options: ['Chicken', 'Lamb', 'Mixed (Chicken & Lamb)', 'Falafel (Vege)']
  },
  {
    id: 'iskender-rice-meal',
    name: 'ISKENDER RICE MEAL',
    description: 'Your choice of fresh meat & salads topped with any two sauces served on rice.',
    price: { small: 20.14, large: 24.38 },
    options: ['Chicken', 'Lamb', 'Mixed (Chicken & Lamb)', 'Falafel (Vege)']
  },
  {
    id: 'salad',
    name: 'SALAD',
    description: 'Your choice of fresh meat & salads topped with any combination of two sauces.',
    price: { small: 20.14, large: 24.38 },
    options: ['Chicken', 'Lamb', 'Mixed (Chicken & Lamb)', 'Falafel (Vege)']
  },
  {
    id: 'chef-kebab',
    name: 'CHEF KEBAB',
    description: 'Your choice of fresh meat, salad chips, hummus & grilled capsicum topped with CHEF Sauces in a warm pita bread.',
    price: { small: 20.14, large: 22.26 },
    options: ['Chicken', 'Lamb', 'Mixed (Chicken & Lamb)', 'Falafel (Vege)']
  },
]

interface CartItem extends MenuItem {
  quantity: number;
  size: 'small' | 'large';
  selectedOption: string;
}

const GallipoliTurkishRestaurant = () => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: MenuItem, quantity: number, size: 'small' | 'large', selectedOption: string) => {
    setCart(prevCart => [
      ...prevCart,
      { ...item, quantity, size, selectedOption }
    ])
  }

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price[item.size] * item.quantity, 0)

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-red-800 p-6 text-center">
        <h1 className="text-4xl font-bold">Gallipoli Turkish Restaurant</h1>
        <p className="mt-2 text-xl">Authentic Turkish Cuisine</p>
      </header>

      <div className="fixed top-16 left-0 right-0 bg-gray-800 p-4 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h2 className="text-xl font-bold">Cart ({cart.length} items)</h2>
          <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-6 pt-24">
        <div className="bg-yellow-400 text-black p-4 rounded-lg mb-6">
          <p className="text-center font-bold">All prices include a 6% add-on</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <Card key={item.id} className="bg-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-2xl">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-red-500">SMALL</p>
                    <p className="text-2xl font-bold">${item.price.small.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-red-500">LARGE</p>
                    <p className="text-2xl font-bold">${item.price.large.toFixed(2)}</p>
                  </div>
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const quantity = parseInt(formData.get('quantity') as string)
                  const size = formData.get('size') as 'small' | 'large'
                  const selectedOption = formData.get('option') as string
                  addToCart(item, quantity, size, selectedOption)
                }}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <label htmlFor={`${item.id}-quantity`} className="w-20">Quantity:</label>
                      <Input
                        type="number"
                        id={`${item.id}-quantity`}
                        name="quantity"
                        defaultValue="1"
                        min="1"
                        className="w-20 text-black"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor={`${item.id}-size`} className="w-20">Size:</label>
                      <Select name="size" defaultValue="small">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor={`${item.id}-option`} className="w-20">Type:</label>
                      <Select name="option" defaultValue={item.options[0]}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {item.options.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">Add to Cart</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gray-800 text-white mt-6">
          <CardContent>
            <div className="flex justify-between items-center">
              <CardTitle className="text-red-500 text-2xl">HOT BOX</CardTitle>
              <p className="text-3xl font-bold">$15.90</p>
            </div>
            <p>Chips or Rice or Salad with Meat</p>
            <Button className="w-full mt-4" onClick={() => addToCart({
              id: 'hot-box',
              name: 'HOT BOX',
              description: 'Chips or Rice or Salad with Meat',
              price: { small: 15.90, large: 15.90 },
              options: ['Chips', 'Rice', 'Salad']
            }, 1, 'small', 'Chips')}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-800 text-center p-4 mt-8">
        <p>&copy; 2024 Gallipoli Turkish Restaurant. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default GallipoliTurkishRestaurant;