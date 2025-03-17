import { useState, useEffect } from "react";
import styles from "../../../styles/Auth.module.css";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { login, register, getCurrentUser } from '../../lib/auth';

const Auth = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          toast.info("Você já está logado!");
          setTimeout(() => {
            router.push('/feed');
          }, 2);
        }
      } catch {
        // Usuário não está logado, não faz nada
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      if (isActive) {
        const success = await register(email, password, name);
        if (success) {
          toast.success("Registro bem-sucedido!");
          await new Promise(resolve => setTimeout(resolve, 1000));
          router.push('/feed');
        } else {
          setError('Erro ao criar conta. Tente novamente.');
        }
      } else {
        const success = await login(email, password);
        if (success) {
          toast.success("Login bem-sucedido!");
          await new Promise(resolve => setTimeout(resolve, 1000));
          router.push('/feed');
        } else {
          setError('Email ou senha inválidos');
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.authWrapper}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={`${styles.container} ${isActive ? styles.containerActive : ""}`} id="container">
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className={styles.socialIcons}>
              <Image width={30} height={30} src="/images/google.png" alt="Google" />
              <Image width={30} height={30} src="/images/facebook.png" alt="Facebook" />
              <Image width={30} height={30} src="/images/twitter.png" alt="Twitter" />
            </div>
            <span>or use your email for registration</span>
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className={styles.input}
              disabled={isSubmitting}
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={styles.input}
              disabled={isSubmitting}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={styles.input}
              disabled={isSubmitting}
            />
            {error && <div className={styles.error}>{error}</div>}
            <button 
              type="submit" 
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processando...' : 'Sign Up'}
            </button>
          </form>
        </div>
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className={styles.socialIcons}>
              <Image width={30} height={30} src="/images/google.png" alt="Google" />
              <Image width={30} height={30} src="/images/facebook.png" alt="Facebook" />
              <Image width={30} height={30} src="/images/twitter.png" alt="Twitter" />
            </div>
            <span>or use your email password</span>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={styles.input}
              disabled={isSubmitting}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={styles.input}
              disabled={isSubmitting}
            />
            <a href="#" className={styles.link}>Forget Your Password?</a>
            {error && <div className={styles.error}>{error}</div>}
            <button 
              type="submit" 
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processando...' : 'Sign In'}
            </button>
          </form>
        </div>
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button 
                className={`${styles.button} ${styles.hidden}`} 
                onClick={() => setIsActive(false)}
                disabled={isSubmitting}
              >
                Sign In
              </button>
            </div>
            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button 
                className={`${styles.button} ${styles.hidden}`} 
                onClick={() => setIsActive(true)}
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
