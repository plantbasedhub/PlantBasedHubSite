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
          src={user.avatar}
          alt={user.name}
          width={32}
          height={32}
          className={styles.dropdownAvatar}
        />
        <span>{user.name}</span>
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

export default function Feed() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  // Mock user data
  const user = {
    name: 'John Doe',
    avatar: '/images/default-avatar.jpg'
  };

  // Mock stories data
  const stories = [
    { id: 1, user: 'Sarah', avatar: '/images/default-avatar.jpg' },
    { id: 2, user: 'Mike', avatar: '/images/default-avatar.jpg' },
    { id: 3, user: 'Emma', avatar: '/images/default-avatar.jpg' },
    { id: 4, user: 'John', avatar: '/images/default-avatar.jpg' },
  ];

  // Mock posts data
  const posts = [
    {
      id: 1,
      user: { name: 'Sarah', avatar: '/images/default-avatar.jpg' },
      image: '/images/default-post.jpg',
      likes: 234,
      caption: 'Delicious vegan breakfast bowl! 🥗',
      timestamp: '2h',
    },
    {
      id: 2,
      user: { name: 'Mike', avatar: '/images/default-avatar.jpg' },
      image: '/images/default-post.jpg',
      likes: 156,
      caption: 'New plant-based recipe coming soon! 🌱',
      timestamp: '4h',
    },
  ];

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
            <button className={styles.messageButton} onClick={() => router.push('/chat')}>
              ✉️
            </button>
            <button className={styles.cartButton} onClick={() => router.push('/store')}>
              🛍️
            </button>
            <div className={styles.profileContainer}>
              <button 
                className={styles.profileButton}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Open profile menu"
              >
                <Image
                  src={user.avatar}
                  alt="Profile"
                  width={32}
                  height={32}
                  className={styles.avatar}
                  priority
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

      <main className={styles.main}>
        <div className={styles.mainFeed}>
          <div className={styles.storiesContainer}>
            <div className={styles.stories}>
              <div className={styles.addStory}>
                <button className={styles.addStoryButton}>+</button>
                <span>Add Story</span>
              </div>
              {stories.map(story => (
                <div key={story.id} className={styles.story}>
                  <div className={styles.storyRing}>
                    <Image
                      src={story.avatar}
                      alt={story.user}
                      width={56}
                      height={56}
                      className={styles.storyAvatar}
                    />
                  </div>
                  <span>{story.user}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.posts}>
            {posts.map(post => (
              <div key={post.id} className={styles.post}>
                <div className={styles.postHeader}>
                  <div className={styles.postUser}>
                    <Image
                      src={post.user.avatar}
                      alt={post.user.name}
                      width={32}
                      height={32}
                      className={styles.postAvatar}
                    />
                    <span>{post.user.name}</span>
                  </div>
                  <button className={styles.moreButton}>⋯</button>
                </div>
                <div className={styles.postImage}>
                  <Image
                    src={post.image}
                    alt="Post content"
                    width={470}
                    height={470}
                    className={styles.postContent}
                  />
                </div>
                <div className={styles.postActions}>
                  <div className={styles.postActionsLeft}>
                    <button>♥️</button>
                    <button>✉️</button>
                    <button>📤</button>
                  </div>
                  <button>🔖</button>
                </div>
                <div className={styles.postLikes}>
                  {post.likes} likes
                </div>
                <div className={styles.postCaption}>
                  <span>{post.user.name}</span> {post.caption}
                </div>
                <div className={styles.postInfo}>
                  <p className={styles.timestamp}>{post.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <NotificationsPopover 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
} 