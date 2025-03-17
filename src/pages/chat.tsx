import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkSession } from '../lib/auth';
import styles from '../styles/Chat.module.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const hasSession = await checkSession();
      if (!hasSession) {
        router.push('/auth');
      }
    };
    checkAuth();
  }, [router]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.sender === 'user' ? styles.userMessage : styles.botMessage
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className={styles.inputForm}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className={styles.input}
          />
          <button type="submit" className={styles.sendButton}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
} 