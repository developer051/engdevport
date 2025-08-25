'use client'
import Link from 'next/link'
import { useState } from 'react'

const NavBar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-black shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Menu Links */}
          <div className="flex-1 flex items-center justify-start">
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                About
              </Link>
              <Link href="/projects" className="text-gray-300 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                Projects
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                Contact
              </Link>
            </div>
          </div>

          {/* Right side - Phone Number */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+1234567890" className="flex items-center text-green-600 hover:text-green-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium text-gray-300">Tel.090-6521408</span>  {/* Mobile Number */}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button p-2 rounded-md hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-red-900"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Projects
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </Link>
            {/* Mobile phone number */}
            <a href="tel:+1234567890" className="flex items-center text-green-300 hover:text-green-900 px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">Tel.09065214</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar2
