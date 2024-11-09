// This component will contain the header with the title and avatar
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import styles from '@/styles/modules/Journal/Journalheader.module.css';

interface JournalHeaderProps {
    // Add any props needed
  }
  
  const JournalHeader: React.FC<JournalHeaderProps> = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div>
                        <h1 className={styles.title}>Moment Manager</h1>
                        <h2 className={styles.subtitle}>Journal</h2>
                    </div>
                    <Avatar className={styles.avatar}>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
  }
  
  export default JournalHeader