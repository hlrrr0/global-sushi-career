'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lineUrl = process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || '#';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="Global Sushi Career Icon"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="text-2xl font-bold">
              <span className="text-red-600">Global</span>
              <span className="text-white"> Sushi </span>
              <span className="text-[#D4AF37]">Career</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/jobs" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              求人を探す
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              About
            </Link>
            <Link href="/for-business" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              採用企業様
            </Link>
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-[#06C755] to-[#00B900] text-white font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>💬</span>
              LINE相談
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-[#D4AF37] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/jobs" 
                className="text-gray-300 hover:text-[#D4AF37] transition-colors px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                求人を探す
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-[#D4AF37] transition-colors px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/for-business" 
                className="text-gray-300 hover:text-[#D4AF37] transition-colors px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                採用企業様
              </Link>
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-[#06C755] to-[#00B900] text-white font-bold rounded-full text-center flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>💬</span>
                LINE相談
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
