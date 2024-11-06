// src/components/layout/Header.tsx
import React from 'react'
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import styles from '@/styles/modules/layout/DashboardHeader.module.css'

interface HeaderProps {
  username: string
}

export const Header: React.FC<HeaderProps> = ({ }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span>Moment</span>
          <span>Manager</span>
        </div>    
        <nav className={styles.nav}>
          <Link to="/dashboard" className={styles.navLinkActive}>Dashboard</Link>
          <Link to="/todo" className={styles.navLink}>To-Do</Link>
          <Link to="/calendar" className={styles.navLink}>Calendar</Link>
          <Link to="/journal" className={styles.navLink}>Journal</Link>
        </nav>
        <div className={styles.controls}>
          <Avatar className={styles.avatarImageContainer}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}