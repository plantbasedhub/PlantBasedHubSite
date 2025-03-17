import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Profile.module.css';
import { account } from '../lib/appwrite';
import { useRouter } from 'next/router';
import { Models } from 'appwrite';
import { toast } from 'react-toastify';
import { FiHome, FiSearch, FiHeart, FiUser, FiMenu } from 'react-icons/fi';

interface Post {
  id: string;
  imageUrl: string;
  description: string;
  likes: number;
  comments: number;
}

function ProfileDropdown({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: Models.User<Models.Preferences> | null }) {
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleNavigation = (path) => {
    onClose();
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.profileDropdown} ref={dropdownRef}>
      <div className={styles.dropdownHeader}>
        <Image
          src={user?.prefs?.avatarUrl || '/images/default-avatar.jpg'}
          alt={user?.name || 'User'}
          width={32}
          height={32}
          className={styles.dropdownAvatar}
        />
        <span>{user?.name || 'User'}</span>
      </div>
      <div className={styles.dropdownContent}>
        <button className={styles.dropdownItem} onClick={() => handleNavigation('/profile')}>
          <span>👤</span> Profile
        </button>
        <button className={styles.dropdownItem} onClick={() => handleNavigation('/settings')}>
          <span>⚙️</span> Settings
        </button>
        <button className={styles.dropdownItem} onClick={handleLogout}>
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
}

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('posts');
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const fetchUserData = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
      setError(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(true);
      toast.error('Failed to load user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      localStorage.removeItem('auth_token');
      router.push('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    fetchUserData();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Failed to load profile</h2>
        <p>There was an error loading your profile data.</p>
        <button className={styles.retryButton} onClick={handleRetry}>
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        <div className={styles.navContent}>
          <Link href="/feed" className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="PlantBasedHub Logo"
              width={40}
              height={40}
              className={styles.logoImage}
              priority
            />
          </Link>
          <div className={styles.navLinks}>
            <Link href="/feed" className={styles.navLink}>
              <FiHome size={24} />
              <span>Home</span>
            </Link>
            <button className={styles.navLink}>
              <FiSearch size={24} />
              <span>Search</span>
            </button>
            <Link href="/notifications" className={styles.navLink}>
              <FiHeart size={24} />
              <span>Notifications</span>
            </Link>
            <Link href="/profile" className={`${styles.navLink} ${styles.active}`}>
              <FiUser size={24} />
              <span>Profile</span>
            </Link>
          </div>
          <button className={styles.menuButton}>
            <FiMenu size={24} />
            <span>More</span>
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.profileContainer}>
          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <Image
                src={user?.prefs?.avatarUrl || '/images/default-avatar.jpg'}
                alt={user?.name || 'User'}
                width={150}
                height={150}
                className={styles.profileAvatar}
                priority
              />
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileNameRow}>
                <h1>{user?.name || 'User'}</h1>
                <div className={styles.profileActions}>
                  <button className={styles.editProfileButton}>Edit Profile</button>
                  <button className={styles.settingsButton}>
                    <FiMenu size={20} />
                  </button>
                </div>
              </div>
              
              <div className={styles.profileStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{user?.prefs?.posts?.length || 0}</span>
                  <span className={styles.statLabel}>posts</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{user?.prefs?.followers || 0}</span>
                  <span className={styles.statLabel}>followers</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{user?.prefs?.following || 0}</span>
                  <span className={styles.statLabel}>following</span>
                </div>
              </div>

              <div className={styles.profileBio}>
                <p className={styles.username}>@{user?.email?.split('@')[0]}</p>
                <p className={styles.bioText}>{user?.prefs?.bio || 'Photographer, travelholic, food lover'}</p>
              </div>
            </div>
          </div>

          {/* Profile Tabs */}
          <div className={styles.profileTabs}>
            <button
              className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              POSTS
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'saved' ? styles.active : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              SAVED
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'liked' ? styles.active : ''}`}
              onClick={() => setActiveTab('liked')}
            >
              LIKED
            </button>
          </div>

          {/* Posts Grid */}
          <div className={styles.postsGrid}>
            {(user?.prefs?.posts || []).map((post: Post) => (
              <div key={post.id} className={styles.postCard}>
                <Image
                  src={post.imageUrl || '/images/default-post.jpg'}
                  alt={post.description || `Post ${post.id}`}
                  width={300}
                  height={300}
                  className={styles.postImage}
                  layout="responsive"
                />
                <div className={styles.postOverlay}>
                  <div className={styles.postStats}>
                    <span>❤️ {post.likes || 0}</span>
                    <span>💬 {post.comments || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className={styles.mobileNav}>
        <Link href="/feed" className={styles.navLink}>
          <FiHome size={24} />
        </Link>
        <button className={styles.navLink}>
          <FiSearch size={24} />
        </button>
        <Link href="/notifications" className={styles.navLink}>
          <FiHeart size={24} />
        </Link>
        <Link href="/profile" className={`${styles.navLink} ${styles.active}`}>
          <FiUser size={24} />
        </Link>
      </nav>
    </div>
  );
} 