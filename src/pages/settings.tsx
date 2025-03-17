import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { account } from '../lib/appwrite';
import { Models } from 'appwrite';
import { toast } from 'react-toastify';
import styles from '../../styles/Settings.module.css';

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    email: '',
    avatarUrl: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
        setFormData({
          name: userData.name || '',
          username: userData.email?.split('@')[0] || '',
          bio: userData.prefs?.bio || '',
          email: userData.email || '',
          avatarUrl: userData.prefs?.avatarUrl || '/images/default-avatar.jpg',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
        router.push('/profile');
      }
    };

    fetchUserData();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement image upload to storage
      // For now, we'll just show a toast
      toast.info('Image upload will be implemented soon');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await account.updatePrefs({
        bio: formData.bio,
        avatarUrl: formData.avatarUrl,
      });

      await account.updateName(formData.name);
      
      toast.success('Profile updated successfully');
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/profile" className={styles.backButton}>
            ←
          </Link>
          <h1>Edit Profile</h1>
          <button 
            className={styles.saveButton} 
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.editContainer}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <Image
                src={formData.avatarUrl}
                alt="Profile"
                width={90}
                height={90}
                className={styles.avatar}
              />
            </div>
            <div className={styles.avatarInfo}>
              <h2>{formData.username}</h2>
              <label className={styles.changePhotoButton}>
                Change profile photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
              </label>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled
                placeholder="Username"
              />
              <span className={styles.fieldNote}>
                Username cannot be changed
              </span>
            </div>

            <div className={styles.formGroup}>
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write something about yourself..."
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                placeholder="Email"
              />
              <span className={styles.fieldNote}>
                Email cannot be changed
              </span>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 