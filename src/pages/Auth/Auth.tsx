import React, { useState } from "react";
import styles from "../../styles/auth.module.css";
import Image from "next/image";
import { useAuth } from "../../hooks/useauth";

const Auth: React.FC = () => {
  const { login, register } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Apenas para registro

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isActive) {
      await register(name, email, password);
    } else {
      await login(email, password);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={`${styles.container} ${isActive ? styles.containerActive : ""}`} id="container">
        
        {/* FORMULÁRIO DE REGISTRO */}
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className={styles.socialIcons}>
              <Image width={30} height={30} src="/google.png" alt="Google" />
              <Image width={30} height={30} src="/facebook.png" alt="Facebook" />
              <Image width={30} height={30} src="/instagram.png" alt="Instagram" />
              <Image width={30} height={30} src="/twitter.png" alt="Twitter" />
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
            <button type="submit" className={styles.button}>Sign Up</button>
          </form>
        </div>

        {/* FORMULÁRIO DE LOGIN */}
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className={styles.socialIcons}>
              <Image width={30} height={30} src="/google.png" alt="Google" />
              <Image width={30} height={30} src="/facebook.png" alt="Facebook" />
              <Image width={30} height={30} src="/instagram.png" alt="Instagram" />
              <Image width={30} height={30} src="/twitter.png" alt="Twitter" />
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
            <a href="#" className={styles.link}>Forget Your Password?</a>
            <button type="submit" className={styles.button}>Sign In</button>
          </form>
        </div>

        {/* TOGGLE ENTRE LOGIN E REGISTRO */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className={`${styles.button} ${styles.hidden}`} onClick={handleLoginClick}>Sign In</button>
            </div>
            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className={`${styles.button} ${styles.hidden}`} onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Auth;
