import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Feed.module.css';
import NotificationsPopover from '../components/NotificationsPopover';

function ProfileDropdown({ isOpen, onClose, user }) {
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

  if (!isOpen) return null;

  const handleProfileClick = () => {
    router.push('/profile');
    onClose();
  };

  return (
    <div className={styles.profileDropdown} ref={dropdownRef}>
      <div className={styles.dropdownHeader}>
        <Image
          src={user.avatar}
          alt={user.name}
          width={32}
          height={32}
          className={styles.dropdownAvatar}
        />
        <span>{user.name}</span>
      </div>
      <div className={styles.dropdownContent}>
        <button onClick={handleProfileClick} className={styles.dropdownItem}>
          <span>👤</span> Profile
        </button>
        <Link href="/settings" className={styles.dropdownItem}>
          <span>⚙️</span> Settings
        </Link>
        <button className={styles.dropdownItem} onClick={() => {
          localStorage.removeItem('auth_token');
          window.location.href = '/Auth';
        }}>
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
}

export default function Feed() {
  const [activeTab, setActiveTab] = useState('home');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  // Mock user data - replace with real user data from your auth system
  const user = {
    name: 'John Doe',
    avatar: '/avatar1.jpg'
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <Link href="/feed" className={styles.logo}>
              <Image
                src="/images/logo.png"
                alt="PlantBasedHub Logo"
                width={50}
                height={50}
                className={styles.logoImage}
                priority
              />
              <span>PlantBasedHub</span>
            </Link>
          </div>
          <div className={styles.headerRight}>
            <button 
              className={styles.notificationButton}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              🔔
            </button>
            <Link href="/chat">
              <button className={styles.messageButton}>💬</button>
            </Link>
            <Link href="/store">
              <button className={styles.cartButton}>🛒</button>
            </Link>
            <div className={styles.profileContainer}>
              <button 
                className={styles.profileButton}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <Image
                  src={user.avatar}
                  alt="Profile"
                  width={32}
                  height={32}
                  className={styles.avatar}
                />
              </button>
              <ProfileDropdown
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                user={user}
              />
            </div>
          </div>
        </div>
      </header>

      <NotificationsPopover 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <main className={styles.main}>
        <aside className={styles.leftSidebar}>
          {/* Left sidebar content */}
        </aside>

        <div className={styles.mainFeed}>
          <div className={styles.storiesContainer}>
            <div className={styles.stories}>
              <div className={styles.addStory}>
                <button className={styles.addStoryButton}>+</button>
                <span>Add Story</span>
              </div>
              {[1, 2, 3, 4, 5].map((story) => (
                <div key={story} className={styles.story}>
                  <div className={styles.storyRing}>
                    <Image
                      src={`/story${story}.jpg`}
                      alt={`Story ${story}`}
                      width={56}
                      height={56}
                      className={styles.storyAvatar}
                    />
                  </div>
                  <span>username{story}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.posts}>
            {[1, 2, 3].map((post) => (
              <div key={post} className={styles.post}>
                <div className={styles.postHeader}>
                  <div className={styles.postUser}>
                    <Image
                      src={`/avatar${post}.jpg`}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className={styles.postAvatar}
                    />
                    <span>username{post}</span>
                  </div>
                  <button className={styles.moreButton}>•••</button>
                </div>
                <div className={styles.postImage}>
                  <Image
                    src={`/post${post}.jpg`}
                    alt={`Post ${post}`}
                    width={470}
                    height={470}
                    className={styles.postContent}
                  />
                </div>
                <div className={styles.postActions}>
                  <div className={styles.postActionsLeft}>
                    <button>❤️</button>
                    <button>💬</button>
                    <button>🔄</button>
                  </div>
                  <button>🔖</button>
                </div>
                <div className={styles.postLikes}>
                  <p><strong>123 likes</strong></p>
                </div>
                <div className={styles.postCaption}>
                  <p>
                    <strong>username{post}</strong> This is a sample caption for post {post}...
                  </p>
                </div>
                <div className={styles.postInfo}>
                  <p className={styles.timestamp}>2 HOURS AGO</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.rightSidebar}>
          {/* Right sidebar content */}
        </aside>
      </main>
    </div>
  );
} 