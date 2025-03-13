import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      router.replace('/feed');
    }
  }, [router]);

  const handleAuthClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    if (token) {
      router.push('/feed');
    } else {
      router.push('/Auth');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        <h1 className={styles.logo}>
          PlantBased <span>Hub</span>
        </h1>
        <div className={`${styles.authButtons} ${isMenuOpen ? styles.authButtonsOpen : ''}`}>
          <button className={styles.login} onClick={handleAuthClick}>Sign In</button>
          <button className={styles.register} onClick={handleAuthClick}>Get Started</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.heroSection}>
          <h2>PlantBased Hub - Vegan Worldwide App</h2>
          <h3>Welcome to PlantBased Hub – Your Gateway to a Sustainable Lifestyle!</h3>
          <p className={styles.description}>
            PlantBased Hub is more than just an app – it's a thriving community
            for vegans and eco-enthusiasts. Share delicious recipes, connect
            with like-minded individuals, shop sustainably, and inspire change.
            Together, we create a better future.
          </p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.startProject} onClick={handleAuthClick}>
            <span>🌱</span> Start your journey
          </button>
          <button className={styles.continueProject} onClick={handleAuthClick}>
            <span>👥</span> Explore community
          </button>
        </div>
        <div className={styles.imageContainer}>
          <Image 
            src="/images/A_Vegan_worldwide_app_1.svg" 
            alt="Sustainable Lifestyle" 
            width={600} 
            height={400}
            priority
          />
        </div>

        <section className={styles.featuresSection}>
          <h2 className={styles.featuresTitle}>Connect, Share, and Inspire</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📸</div>
              <h3>Photo & Video Posts</h3>
              <p>Share your vegan journey through stunning photos and videos on our mobile app. Create beautiful posts with captions showcasing your plant-based lifestyle and favorite recipes.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📝</div>
              <h3>Text Posts & Stories</h3>
              <p>Engage in meaningful discussions with text posts. Share your thoughts, recipes, and experiences. Create and view stories on our mobile app to share moments of your day.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3>Personal Chat</h3>
              <p>Connect privately with other members through our personal chat feature. Share tips, recipes, and build meaningful relationships. On mobile, enjoy video calls, voice calls, and voice messages for a more personal connection.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👤</div>
              <h3>Personal Profiles</h3>
              <p>Create your unique profile, showcase your vegan journey, and connect with others. Follow inspiring members and build your community.</p>
            </div>
          </div>
        </section>

        <section className={styles.storeSection}>
          <h2 className={styles.storeTitle}>Sustainable Shopping</h2>
          <div className={styles.storeContent}>
            <div className={styles.storeText}>
              <h3>Curated Vegan Products</h3>
              <p>Discover our carefully selected collection of high-quality vegan products. From sustainable clothing to eco-friendly home goods, find everything you need for a conscious lifestyle.</p>
              <button className={styles.storeButton} onClick={handleAuthClick}>
                <span>🛍️</span> Explore Store
              </button>
            </div>
            <div className={styles.storeImage}>
              <Image 
                src="/images/logo.png" 
                alt="Sustainable Store" 
                width={500} 
                height={300}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="#privacy">Privacy Policy</Link>
          <Link href="#terms">Terms of Service</Link>
        </div>
        <p>© 2024 PlantBasedHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
