import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../../styles/NotificationsPopover.module.css';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsPopover({ isOpen, onClose }: NotificationsPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div ref={popoverRef} className={styles.popover}>
        <div className={styles.header}>
          <h2>Notificações</h2>
        </div>
        <div className={styles.content}>
          {[1, 2, 3].map((notification) => (
            <div key={notification} className={styles.notification}>
              <div className={styles.notificationAvatar}>
                <Image
                  src={`/avatar${notification}.jpg`}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
              </div>
              <div className={styles.notificationContent}>
                <p>
                  <strong>username{notification}</strong> começou a seguir você
                </p>
                <span className={styles.timestamp}>2h atrás</span>
              </div>
              <button className={styles.followButton}>Seguir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 