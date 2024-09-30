'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Sun, Moon } from 'lucide-react'

const styles = [
  // Style 1: Neon Cyberpunk
  {
    name: "Neon Cyberpunk",
    main: "min-h-screen bg-gray-900 text-cyan-400 flex flex-col items-center justify-center p-8",
    h1: "text-6xl font-bold mb-12 cyberpunk-glitch",
    linkContainer: "flex flex-col items-center gap-6",
    link: "px-8 py-3 bg-transparent border-2 border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105 hover:rotate-1 neon-glow-pink",
    buttonBg: "bg-cyan-500",
    buttonText: "text-gray-900"
  },
  // Style 2: Neumorphic Elegance
  {
    name: "Neumorphic Elegance",
    main: "min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-8",
    h1: "text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600",
    linkContainer: "grid grid-cols-1 md:grid-cols-2 gap-6",
    link: "px-8 py-3 bg-gray-100 rounded-xl shadow-neumorphic hover:shadow-neumorphic-pressed transition-all duration-300 ease-in-out transform hover:scale-105",
    buttonBg: "bg-gray-200",
    buttonText: "text-gray-800"
  },
  // Style 3: Glassmorphism Paradise
  {
    name: "Glassmorphism Paradise",
    main: "min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-8",
    h1: "text-7xl font-extrabold mb-12 text-white drop-shadow-lg",
    linkContainer: "flex flex-col items-center gap-6",
    link: "px-8 py-3 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl hover:bg-opacity-30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-rotate-1",
    buttonBg: "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg",
    buttonText: "text-white"
  },
  // Style 4: Retro Wave
  {
    name: "Retro Wave",
    main: "min-h-screen bg-gradient-to-b from-purple-900 via-pink-800 to-orange-700 text-cyan-300 flex flex-col items-center justify-center p-8",
    h1: "text-6xl font-bold mb-12 retro-wave-text",
    linkContainer: "flex flex-col items-center gap-6",
    link: "px-8 py-3 bg-cyan-300 text-purple-900 rounded-full font-bold hover:bg-yellow-300 hover:text-pink-800 transition-all duration-300 ease-in-out transform hover:scale-105 hover:rotate-2",
    buttonBg: "bg-cyan-300",
    buttonText: "text-purple-900"
  },
  // Style 5: Minimalist Zen
  {
    name: "Minimalist Zen",
    main: "min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-8",
    h1: "text-5xl font-thin mb-12 tracking-wide",
    linkContainer: "flex flex-col items-center gap-6",
    link: "px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105",
    buttonBg: "bg-gray-200",
    buttonText: "text-gray-800"
  }
]

export default function Home() {
  const [currentStyle, setCurrentStyle] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedStyle = localStorage.getItem('currentStyle')
    if (savedStyle !== null) {
      setCurrentStyle(parseInt(savedStyle, 10))
    }

    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true')
    }

    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('currentStyle', currentStyle.toString())
      localStorage.setItem('darkMode', isDarkMode.toString())
      
      if (isDarkMode) {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }
    }
  }, [currentStyle, isDarkMode, isLoaded])

  const nextStyle = () => {
    setCurrentStyle((prevStyle) => (prevStyle + 1) % styles.length)
  }

  const prevStyle = () => {
    setCurrentStyle((prevStyle) => (prevStyle - 1 + styles.length) % styles.length)
  }

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  const currentClasses = styles[currentStyle]

  if (!isLoaded) {
    return null // or a loading spinner
  }

  return (
    <main className={`${currentClasses.main} transition-all duration-500 ease-in-out ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <button
          onClick={prevStyle}
          className={`p-2 rounded-full ${currentClasses.buttonBg} ${currentClasses.buttonText} hover:scale-110 transition-transform duration-200`}
          aria-label="Previous style"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextStyle}
          className={`p-2 rounded-full ${currentClasses.buttonBg} ${currentClasses.buttonText} hover:scale-110 transition-transform duration-200`}
          aria-label="Next style"
        >
          <ChevronRight size={24} />
        </button>
        <motion.button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${currentClasses.buttonBg} ${currentClasses.buttonText} hover:scale-110 transition-transform duration-200`}
          aria-label="Toggle dark mode"
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
      </div>
      <p className="absolute top-16 left-4 text-sm">{currentClasses.name}</p>
      <motion.h1
        className={currentClasses.h1}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        YouChews
      </motion.h1>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStyle}
          className={currentClasses.linkContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/gallipoli-restaurant" className={currentClasses.link}>
            Go to Gallipoli Turkish Restaurant
          </Link>
          <Link href="/niko-niko-roll-and-sushi" className={currentClasses.link}>
  Go to Niko Niko Roll & Sushi
</Link>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
