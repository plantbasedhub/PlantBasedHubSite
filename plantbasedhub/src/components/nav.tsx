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
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <Image src="/plantbasedhubLogo.png" alt="Logo" width={150} height={150} />
        {/* <Link href="/">PlantBased Hub</Link> */}
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.dropdown}>
          <a href="#">Services</a>
          <ul className={styles.dropdownMenu}>
            <li>
              <Link href="/services/service1">Service 1</Link>
            </li>
            <li>
              <Link href="/services/service2">Service 2</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
