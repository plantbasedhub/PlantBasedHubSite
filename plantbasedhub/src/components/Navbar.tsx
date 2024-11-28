import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <header className={`${styles.navbar}`}>
        <nav className={`${styles.navbarContainer}`}>
          {/* Logo */}
          <Link href="/" className={styles.homeLink}>
            <div className={styles.navbarLogo}>
              <Image
                src="/logo_hz.png"
                alt="Logo"
                width={90}
                height={90}
                className={styles.logoImage}
              />
            </div>
          </Link>

          {/* Botões de Login e Menu Hamburger */}
          <div className={styles.navRight}>
            <div className={styles.navButtons}>
              <Link href="/Auth/Auth">
                <button className={styles.loginButton}>Log in</button>
              </Link>
              <Link href="/Auth/Auth">
                <button className={styles.signupButton}>Create an account</button>
              </Link>
            </div>
            <button
              type="button"
              className={`${styles.navbarToggle}`}
              aria-label="Toggle menu"
              aria-expanded={isSidebarOpen}
              onClick={toggleSidebar}
            >
              <span className={styles.iconBar}></span>
              <span className={styles.iconBar}></span>
              <span className={styles.iconBar}></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Right Sidebar */}
      <div
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        {/* Botão de Fechar no Topo Direito */}
        <button
          className={styles.sidebarCloseButton}
          onClick={closeSidebar}
          aria-label="Close menu"
        >
          &times;
        </button>

        {/* Sidebar Links */}
        <ul className={styles.sidebarLinks}>
          <li>
            <Link href="#about" onClick={closeSidebar}>
              About
            </Link>
          </li>
          <li>
            <Link href="#discover" onClick={closeSidebar}>
              Discover
            </Link>
          </li>
          <li>
            <Link href="#contact" onClick={closeSidebar}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Botões dentro do Menu */}
        <div className={styles.sidebarButtons}>
          <Link href="/Auth/Auth">
            <button className={styles.loginButton}>Log in</button>
          </Link>
          <Link href="/Auth/Auth">
            <button className={styles.signupButton}>Create an account</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
