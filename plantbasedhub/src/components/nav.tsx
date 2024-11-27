'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Certifique-se de que está importando de next/image
import styles from '../styles/Navbar.module.css'; // Verifique se o caminho está correto

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="bg-green-600 px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="rounded-full">
            <Image
              src="/logo.png"
              alt="Logo"
              width={75}
              height={75}
              className="rounded-full"
            />
          </div>
          <span className="ml-2 text-white text-lg font-bold">
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#home"
            className="text-white hover:text-green-200 transition duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white hover:text-green-200 transition duration-200"
          >
            About
          </a>
          <a
            href="#discover"
            className="text-white hover:text-green-200 transition duration-200"
          >
            Discover
          </a>
          <a
            href="#contact"
            className="text-white hover:text-green-200 transition duration-200"
          >
            Contact
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Link rel="stylesheet" href="/Auth/Auth" >
          <button className="text-white border border-white px-4 py-1 rounded hover:bg-green-500 hover:border-green-500 transition duration-200">
            Log in
          </button>
          </Link>
          <Link rel="stylesheet" href="/Auth/Auth" >
          <button className="bg-white text-green-600 px-4 py-1 rounded hover:bg-green-500 hover:text-white transition duration-200">
            Create an account
          </button>
          </Link>
        </div>
      </nav>

  );
};

export default Navbar;
