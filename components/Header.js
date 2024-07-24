// components/Header.js
import Image from 'next/image'
import DarkModeToggle from './DarkModeToggle'

export default function Header() {
  return (
    <header className='bg-white sticky top-0 z-50 dark:bg-gray-800 shadow-lg'>
      <div className='container max-w-screen-lg mx-auto px-4 py-2 flex justify-between items-center'>
        <Image src='/images/icon-picky@3x.png' alt='Picky Logo' width={24} height={24} />
        <a className='flex items-center space-x-2' href='/'>
          <span className='text-gray-900 dark:text-gray-100 font-bold'>Home</span>
        </a>
        <div className='flex items-center space-x-4'>
          <Image src='/images/search@3x.png' alt='Search' width={24} height={24} />
          <Image src='/images/icon-bookmark-14-px@3x.png' alt='Bookmark' width={24} height={24} />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  )
}
