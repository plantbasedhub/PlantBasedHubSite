import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Auth.module.css';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui vai a lógica de autenticação
    // Se autenticação bem sucedida:
    localStorage.setItem('auth_token', 'token_example');
    router.push('/feed');
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.leftSide}>
          <h1>Sign In</h1>
          
          <div className={styles.socialLogin}>
            <button className={styles.googleBtn}>
              <Image src="/images/google-icon.png" alt="Google" width={24} height={24} />
            </button>
            <button className={styles.facebookBtn}>
              <Image src="/images/facebook-icon.png" alt="Facebook" width={24} height={24} />
            </button>
            <button className={styles.twitterBtn}>
              <Image src="/images/twitter-icon.png" alt="Twitter" width={24} height={24} />
            </button>
          </div>

          <p className={styles.divider}>or use your email password</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            
            <button type="button" className={styles.forgotPassword}>
              Forget Your Password?
            </button>

            <button type="submit" className={styles.signInButton}>
              SIGN IN
            </button>
          </form>
        </div>

        <div className={styles.rightSide}>
          <h2>Hello, Friend!</h2>
          <p>Register with your personal details to use all of site features</p>
          <button className={styles.signUpButton}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
} 