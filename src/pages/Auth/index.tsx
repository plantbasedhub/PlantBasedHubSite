

import { useState } from "react";
import styles from "../../styles/Auth.module.css";
import Image from "next/image";

const Auth = () => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = isActive ? "/api/Auth/register" : "/api/Auth/login";
    const body = isActive ? { name, email, password } : { email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      if (!isActive) localStorage.setItem("token", data.token);
      setMessage(isActive ? "Registro bem-sucedido!" : "Login bem-sucedido!");
    } else {
      setMessage(data.error || "Erro na autenticação");
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={`${styles.container} ${isActive ? styles.containerActive : ""}`} id="container">
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className={styles.socialIcons}>
              <Image width={30} height={30} src="/img/google.png" alt="Google" />
              <Image width={30} height={30} src="/img/facebook.png" alt="Facebook" />
              <Image width={30} height={30} src="/img/instagram.png" alt="Instagram" />
              <Image width={30} height={30} src="/img/twitter.png" alt="Twitter" />
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
            <button type="submit" className={styles.button}>Sign Up</button>
            <p>{message}</p>
          </form>
        </div>
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
            <p>{message}</p>
          </form>
        </div>
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
