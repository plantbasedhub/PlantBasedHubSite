import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Chat.module.css';
import Header from '../components/Header';

export default function Chat() {
  const router = useRouter();
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock user data - replace with real user data from your auth system
  const user = {
    name: 'John Doe',
    avatar: '/avatar1.jpg'
  };

  const conversations = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '2m', unread: 2 },
    { id: 2, name: 'Jane Smith', lastMessage: 'The recipe was amazing!', time: '1h', unread: 0 },
    { id: 3, name: 'Mike Johnson', lastMessage: 'See you tomorrow!', time: '3h', unread: 1 },
  ];

  const messages = [
    { id: 1, sender: 'them', text: 'Hey, how are you?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'I\'m good, thanks! How about you?', time: '10:31 AM' },
    { id: 3, sender: 'them', text: 'Great! Did you try that new vegan restaurant?', time: '10:32 AM' },
    { id: 4, sender: 'me', text: 'Not yet, but I\'ve heard good things about it!', time: '10:33 AM' },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    router.push('/login');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add message handling logic here
      setMessage('');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <Header 
        showSearch={true}
        searchPlaceholder="Pesquisar usuários..."
        onSearch={handleSearch}
      />

      <div className={styles.chatContainer}>
        <div className={styles.conversationsList}>
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className={`${styles.conversation} ${activeChat === conv.id ? styles.active : ''}`}
              onClick={() => setActiveChat(conv.id)}
            >
              <Image
                src={`/avatar${conv.id}.jpg`}
                alt={conv.name}
                width={40}
                height={40}
                className={styles.conversationAvatar}
              />
              <div className={styles.conversationInfo}>
                <div className={styles.conversationHeader}>
                  <h3>{conv.name}</h3>
                  <span>{conv.time}</span>
                </div>
                <div className={styles.conversationPreview}>
                  <p>{conv.lastMessage}</p>
                  {conv.unread > 0 && <span className={styles.unreadBadge}>{conv.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.chatArea}>
          <div className={styles.messages}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${msg.sender === 'me' ? styles.sent : styles.received}`}
              >
                <div className={styles.messageContent}>
                  <p>{msg.text}</p>
                  <span className={styles.messageTime}>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className={styles.messageInput}>
            <button type="button" className={styles.attachButton}>
              📎
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite uma mensagem..."
            />
            <button type="submit" className={styles.sendButton}>
              📤
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 