'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import restaurants from '@/data/restaurants.json'

const iconicBlackStyle = {
  main: "min-h-screen bg-black text-blue-500 flex flex-col items-center justify-center p-8",
  linkContainer: "flex flex-col items-center gap-6 w-full max-w-md",
  link: "px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 w-full text-center",
}

export default function Home() {
  return (
    <main className={iconicBlackStyle.main}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-[368px] h-[184px] relative mb-12">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oU1wjlLxUfUV3WPZUD5lKHvFApfQ8h.png"
            alt="YouChews Logo"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </motion.div>
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
    </main>
  )
}