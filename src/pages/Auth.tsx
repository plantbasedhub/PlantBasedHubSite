import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Auth.module.css';
import Cookies from 'js-cookie';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você substituiria por sua lógica real de autenticação
      if (email && password) {
        Cookies.set('auth_token', 'token_example', { 
          expires: 7,
          path: '/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
        router.push('/feed');
      } else {
        throw new Error('Please fill in all fields');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.leftSide}>
          <h1>Sign In</h1>
          
          <div className={styles.socialLogin}>
            <button className={styles.googleBtn} disabled={isLoading}>
              <Image src="/images/google-icon.png" alt="Google" width={24} height={24} />
            </button>
            <button className={styles.facebookBtn} disabled={isLoading}>
              <Image src="/images/facebook-icon.png" alt="Facebook" width={24} height={24} />
            </button>
            <button className={styles.twitterBtn} disabled={isLoading}>
              <Image src="/images/twitter-icon.png" alt="Twitter" width={24} height={24} />
            </button>
          </div>

          <p className={styles.divider}>or use your email password</p>

          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              disabled={isLoading}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              disabled={isLoading}
              required
            />
            
            <button 
              type="button" 
              className={styles.forgotPassword}
              disabled={isLoading}
            >
              Forget Your Password?
            </button>

            <button 
              type="submit" 
              className={`${styles.signInButton} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'SIGN IN'}
            </button>
          </form>
        </div>

        <div className={styles.rightSide}>
          <h2>Hello, Friend!</h2>
          <p>Register with your personal details to use all of site features</p>
          <button 
            className={styles.signUpButton}
            disabled={isLoading}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
} 