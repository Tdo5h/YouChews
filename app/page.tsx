'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import restaurants from '@/data/restaurants.json'
import LoginButtonWrapper from '../components/LoginButtonWrapper'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Settings } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

const iconicBlackStyle = {
  main: "min-h-screen bg-black text-blue-500 flex flex-col items-center justify-center p-4 sm:p-8",
  linkContainer: "flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-sm",
  link: "px-4 py-2 sm:px-6 sm:py-3 bg-transparent border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 w-full text-center text-sm sm:text-base",
  button: "px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center text-sm sm:text-base",
  iconButton: "p-2 bg-transparent border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105",
}

export default function Home() {
  const { cart, lastShop } = useCart();
  const [hasSelectedItems, setHasSelectedItems] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    setHasSelectedItems(cart.length > 0)
    setCartItemCount(cart.reduce((sum, item) => sum + item.quantity, 0))
  }, [cart])

  const handleContinueShopping = () => {
    if (lastShop) {
      let path = '/';
      if (lastShop === 'New Hong Kong Chinese Restaurant') {
        path = '/restaurant/new-hong-kong';
      } else if (lastShop === 'Gallipoli Turkish Restaurant') {
        path = '/restaurant/gallipoli';
      } else if (lastShop === 'Niko Niko Roll & Sushi') {
        path = '/restaurant/niko-niko-roll-and-sushi';
      } else if (lastShop === "Hot Chili's Italian Restaurant") {
        path = '/restaurant/hot-chilis';
      }
      router.push(path);
    }
  }

  const handleRestart = () => {
    localStorage.removeItem('cart')
    localStorage.removeItem('lastShop')
    setHasSelectedItems(false)
    setCartItemCount(0)
  }

  return (
    <main className={iconicBlackStyle.main}>
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <LoginButtonWrapper />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-12"
      >
        <div className="w-[200px] h-[100px] sm:w-[294px] sm:h-[147px] relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oU1wjlLxUfUV3WPZUD5lKHvFApfQ8h.png"
            alt="YouChews Logo"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </motion.div>
      {hasSelectedItems && (
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
          <button onClick={handleContinueShopping} className={iconicBlackStyle.button}>
            Continue
            <ShoppingCart size={16} className="ml-1 sm:ml-2" />
            <span className="ml-1">{cartItemCount}</span>
          </button>
          <button onClick={handleRestart} className={iconicBlackStyle.button}>
            Restart
          </button>
        </div>
      )}
      <motion.div
        className={iconicBlackStyle.linkContainer}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {restaurants.map((restaurant) => (
          <Link key={restaurant.slug} href={`/restaurant/${restaurant.slug}`} className={iconicBlackStyle.link}>
            {restaurant.name}
          </Link>
        ))}
      </motion.div>
      <div className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 z-50">
        <button className={iconicBlackStyle.iconButton} aria-label="Settings">
          <Settings size={20} />
        </button>
      </div>
      <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50">
        <Link href="/cart">
          <button className={iconicBlackStyle.iconButton} aria-label="View Cart">
            <ShoppingCart size={20} />
          </button>
        </Link>
      </div>
    </main>
  )
}