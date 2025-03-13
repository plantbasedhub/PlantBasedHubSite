import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Profile.module.css';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('posts');

  const user = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Plant-based lifestyle enthusiast 🌱 | Food blogger | Nature lover 🌿',
    posts: 42,
    followers: 1234,
    following: 567,
    avatar: '/avatar1.jpg'
  };

  const posts = [
    { id: 1, image: '/post1.jpg', likes: 123, comments: 12 },
    { id: 2, image: '/post2.jpg', likes: 234, comments: 23 },
    { id: 3, image: '/post3.jpg', likes: 345, comments: 34 },
    { id: 4, image: '/post4.jpg', likes: 456, comments: 45 },
    { id: 5, image: '/post5.jpg', likes: 567, comments: 56 },
    { id: 6, image: '/post6.jpg', likes: 678, comments: 67 }
  ];

  return (
    <ProtectedRoute>
      <AuthenticatedLayout>
        <div className={styles.profileContainer}>
          <div className={styles.profileInfo}>
            <div className={styles.profileHeader}>
              <Image
                src={user.avatar}
                alt={user.name}
                width={100}
                height={100}
                className={styles.profileAvatar}
              />
              <div className={styles.profileStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{user.posts}</span>
                  <span className={styles.statLabel}>Posts</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{user.followers}</span>
                  <span className={styles.statLabel}>Followers</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{user.following}</span>
                  <span className={styles.statLabel}>Following</span>
                </div>
              </div>
            </div>

            <div className={styles.profileBio}>
              <h2>{user.name}</h2>
              <span className={styles.username}>{user.username}</span>
              <p>{user.bio}</p>
              <button className={styles.editProfileButton}>
                Edit Profile
              </button>
            </div>
          </div>

          <div className={styles.profileTabs}>
            <button
              className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'saved' ? styles.active : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              Saved
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'liked' ? styles.active : ''}`}
              onClick={() => setActiveTab('liked')}
            >
              Liked
            </button>
          </div>

          <div className={styles.postsGrid}>
            {posts.map(post => (
              <div key={post.id} className={styles.postCard}>
                <Image
                  src={post.image}
                  alt={`Post ${post.id}`}
                  width={300}
                  height={300}
                />
                <div className={styles.postOverlay}>
                  <div className={styles.postStats}>
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AuthenticatedLayout>
    </ProtectedRoute>
  );
} 