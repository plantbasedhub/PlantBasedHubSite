import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export default function Header({ showSearch = false, searchPlaceholder = '', onSearch }: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock user data - replace with real user data from your auth system
  const user = {
    name: 'John Doe',
    avatar: '/avatar1.jpg'
  };

  const handleLogout = () => {
    // Add your logout logic here
    router.push('/login');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/feed" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="PlantBasedHub Logo"
            width={40}
            height={40}
            className={styles.logoImage}
            priority
          />
          <span>PlantBasedHub</span>
        </Link>

        {showSearch && (
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
        )}

        <div className={styles.headerActions}>
          <div className={styles.profileDropdown}>
            <button 
              className={styles.profileButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Image
                src={user.avatar}
                alt="Profile"
                width={32}
                height={32}
                className={styles.avatar}
              />
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={50}
                    height={50}
                    className={styles.dropdownAvatar}
                  />
                  <span>{user.name}</span>
                </div>
                <Link href="/profile" className={styles.dropdownItem}>
                  Ver Perfil
                </Link>
                <Link href="/settings" className={styles.dropdownItem}>
                  Definições
                </Link>
                <button onClick={handleLogout} className={styles.dropdownItem}>
                  Terminar Sessão
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 