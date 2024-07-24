// components/DarkModeToggle.js
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.style.getPropertyValue('--initial-color-mode')

    // Set initial dark mode state
    setIsDarkMode(initialColorValue === 'dark')
  }, [])

  const toggleDarkMode = () => {
    const root = window.document.documentElement
    const newColorMode = isDarkMode ? 'light' : 'dark'

    root.classList.remove(isDarkMode ? 'dark' : 'light')
    root.classList.add(newColorMode)

    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', newColorMode)
  }

  return (
    <button onClick={toggleDarkMode} className='p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'>
      {isDarkMode ? '🌞' : '🌜'}
    </button>
  )
}
