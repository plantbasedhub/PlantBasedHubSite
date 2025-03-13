import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Feed.module.css';
import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default function Feed() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <AuthenticatedLayout>
      <div className={styles.main}>
        <div className={styles.storiesContainer}>
          <div className={styles.stories}>
            <div className={styles.story}>
              <div className={styles.addStory}>
                <span>+</span>
                <p>Add Story</p>
              </div>
            </div>
            {[1, 2, 3, 4, 5].map((story) => (
              <div key={story} className={styles.story}>
                <Image
                  src={`/story${story}.jpg`}
                  alt={`Story ${story}`}
                  width={60}
                  height={60}
                />
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
                  />
                  <span>username{post}</span>
                </div>
                <button>•••</button>
              </div>
              <div className={styles.postImage}>
                <Image
                  src={`/post${post}.jpg`}
                  alt={`Post ${post}`}
                  width={500}
                  height={500}
                />
              </div>
              <div className={styles.postActions}>
                <div>
                  <button>❤️</button>
                  <button>💬</button>
                  <button>🔄</button>
                </div>
                <button>🔖</button>
              </div>
              <div className={styles.postInfo}>
                <p><strong>123 likes</strong></p>
                <p>
                  <strong>username{post}</strong> This is a sample caption for post {post}...
                </p>
                <p className={styles.timestamp}>2 HOURS AGO</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 