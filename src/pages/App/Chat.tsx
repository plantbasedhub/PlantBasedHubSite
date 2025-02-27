import Image from "next/image";
import Head from "next/head"; // Certifique-se de importar o Head
import Navbar from "../../components/Navbar"; // Navbar principal
import WhatIsPlantBasedHub from "../../components/WhatIsPlantBasedhub"; // Importando o componente
import styles from "../../styles/home.module.css"; // CSS principal
import Carousel from "../../components/Carousel";

interface ChatProps {
    children: React.ReactNode;
  }
  
  const Chat: React.FC<ChatProps> = ({ children }) => {
    return (
      <div className={styles.chatLayout}>
        {/* Header */}
        <header className={styles.chatHeader}> 
          <div className={styles.chatBackButton}>
            <button>
              {/* Icon for back button */}
              <span>&larr;</span>
            </button>
          </div>
          <div className={styles.chatUserInfo}>
            <img
              src="/path/to/profile-pic.jpg"
              alt="User Profile"
              className={styles.chatUserAvatar}
            />
            <span className={styles.chatUserName}>Username</span>
          </div>
        </header>
  
        {/* Chat messages */}
        <main className={styles.chatMessages}>
          {children}
        </main>
  
        {/* Message input */}
        <footer className={styles.chatFooter}>
          <div className={styles.messageInputContainer}>
            <input
              type="text"
              placeholder="Write a message..."
              className={styles.messageInput}
            />
            <button className={styles.sendButton}>
              {/* Icon for send button */}
              <span>&#x27A4;</span>
            </button>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Chat;
