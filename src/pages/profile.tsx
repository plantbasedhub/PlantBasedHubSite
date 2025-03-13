import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Profile.module.css';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { account } from '../lib/appwrite';
import { useRouter } from 'next/router';
import { Models } from 'appwrite';
import { toast } from 'react-toastify';

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('posts');
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
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
    <AuthenticatedLayout>
      <div className={styles.profileContainer}>
        <div className={styles.profileInfo}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <Image
                src={user.prefs?.avatarUrl || '/default-avatar.png'}
                alt={user.name || 'User'}
                width={100}
                height={100}
                className={styles.profileAvatar}
              />
            </div>
            <div className={styles.profileStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{user.prefs?.posts || 0}</span>
                <span className={styles.statLabel}>Posts</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{user.prefs?.followers || 0}</span>
                <span className={styles.statLabel}>Followers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{user.prefs?.following || 0}</span>
                <span className={styles.statLabel}>Following</span>
              </div>
            </div>
          </div>

          <div className={styles.profileBio}>
            <h2>{user.name || 'User'}</h2>
            <span className={styles.username}>@{user.email?.split('@')[0]}</span>
            <p>{user.prefs?.bio || 'No bio yet'}</p>
            <div className={styles.profileActions}>
              <button className={styles.editProfileButton} onClick={() => router.push('/settings')}>
                Edit Profile
              </button>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
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
          {(user.prefs?.posts || []).map((post: any) => (
            <div key={post.id} className={styles.postCard}>
              <Image
                src={post.imageUrl || '/default-post.png'}
                alt={post.description || `Post ${post.id}`}
                width={300}
                height={300}
                className={styles.postImage}
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
    </AuthenticatedLayout>
  );
} 