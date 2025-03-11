import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";


export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="#about">About us</Link>
          <Link href="#contact">Contact us</Link>
        </nav>
        <h1 className={styles.logo}>
          PlantBased <span>Hub</span>
        </h1>
        <div className={styles.authButtons}>
          <Link href="/Auth"><button className={styles.login}>Login</button></Link>
          <Link href="/Auth"><button className={styles.register}>Register</button></Link>
        </div>
      </header>

      <main className={styles.main}>
        <h2>Good quality work at sensible prices</h2>
        <div className={styles.buttons}>
          <button className={styles.startProject}>Start your project</button>
          <button className={styles.continueProject}>Continue your project</button>
        </div>
        <div className={styles.imageContainer}>
          <Image src="" alt="Construction Workers" width={300} height={200} />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="#privacy">Privacy policy</Link>
          <Link href="#terms">Terms</Link>
        </div>
        <p>Copyright © 2025 PlantBasedHub All Rights Reserved.</p>
      </footer>
    </div>
  );
}
