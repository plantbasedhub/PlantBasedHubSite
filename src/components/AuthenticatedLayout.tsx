import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/AuthenticatedLayout.module.css';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de pesquisa
  };

  return (
    <div className={styles.container}>
      {/* Top Navigation */}
      <header className={styles.header}>
        <Link href="/feed" className={styles.logo}>
          <Image 
            src="/images/logo.png" 
            alt="PlantBased Hub" 
            width={40} 
            height={40}
          />
          <span>PlantBased <span>Hub</span></span>
        </Link>

        <form className={styles.searchBar} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        <div className={styles.headerActions}>
          <Link href="/store/cart" className={styles.cartButton}>
            🛒
          </Link>
          <Link href="/profile" className={styles.profileButton}>
            <Image 
              src="/images/default-avatar.jpg" 
              alt="Profile" 
              width={32} 
              height={32}
              className={styles.avatar}
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className={styles.bottomNav}>
        <Link href="/chat" className={styles.navItem}>
          💬
        </Link>
        <div className={styles.spacer}></div>
        <Link href="/store" className={styles.navItem}>
          🛍️
        </Link>
      </nav>
    </div>
  );
} 