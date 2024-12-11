import React, { useState } from "react";
import styles from "../../styles/auth.module.css";
import Image from "next/image";

const Auth: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div className={styles.authWrapper}>
      <div
        className={`${styles.container} ${isActive ? styles.containerActive : ""}`}
        id="container"
      >
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form>
            <h1>Create Account</h1>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.icon}>
                <Image 
                width={30}
                height={30}
                src="/google.png" alt="Google" />
              </a>
              <a href="#" className={styles.icon}>
              <Image 
                width={30}
                height={30}
                src="/facebook.png" alt="Facebook" />
              </a>
              <a href="#" className={styles.icon}>
              <Image 
                width={30}
                height={30}
                src="/instagram.png" alt="Instagram" />
              </a>
              <a href="#" className={styles.icon}>
              <Image 
                width={30}
                height={30}
                src="/twitter.png" alt="Twitter" />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" className={styles.input} />
            <input type="email" placeholder="Email" className={styles.input} />
            <input type="password" placeholder="Password" className={styles.input} />
            <button type="button" className={styles.button}>
              Sign Up
            </button>
          </form>
        </div>
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form>
            <h1>Sign In</h1>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" className={styles.input} />
            <input type="password" placeholder="Password" className={styles.input} />
            <a href="#" className={styles.link}>
              Forget Your Password?
            </a>
            <button type="button" className={styles.button}>
              Sign In
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
                id="login"
                onClick={handleLoginClick}
              >
                Sign In
              </button>
            </div>
            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button
                className={`${styles.button} ${styles.hidden}`}
                id="register"
                onClick={handleRegisterClick}
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
