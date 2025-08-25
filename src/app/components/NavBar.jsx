"use client";
import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-gray-800">
              EngDev Port
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-gray-900"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
