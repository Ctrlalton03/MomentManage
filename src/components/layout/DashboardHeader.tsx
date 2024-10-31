// src/components/layout/Header.tsx
import React from 'react'
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Settings } from "lucide-react"
import styles from '@/styles/modules/DashboardHeader.module.css'

interface HeaderProps {
  username: string
}

export const Header: React.FC<HeaderProps> = ({ }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>Moment Manager</h1>
          <nav className={styles.nav}>
            <Link to="/dashboard" className={styles.navLinkActive}>Dashboard</Link>
            <Link to="/todo" className={styles.navLink}>To-Do</Link>
            <Link to="/calendar" className={styles.navLink}>Calendar</Link>
            <Link to="/journal" className={styles.navLink}>Journal</Link>
          </nav>
        </div>
        <div className={styles.controls}>
          <Button variant="ghost" size="icon" className={styles.iconButton}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className={styles.iconButton}>
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar className={styles.avatarImageContainer}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}