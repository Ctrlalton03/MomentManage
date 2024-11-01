import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Calendar as CalendarIcon, Book } from "lucide-react"
import styles from "@/styles/modules/QuickActions.module.css"

export const QuickActions: React.FC = () => {
  return (
    <section className={styles.quickActionsSection}>
    <h2 className={styles.quickActionsHeading}>Quick Actions</h2>
    <div className={styles.actionCardsContainer}>
    <Link to="/todo" className={styles.actionLink}>
        <div className={styles.actionCard}>
          <CheckCircle className={`${styles.actionIcon} ${styles.todoIcon}`} />
          <h3 className={styles.actionTitle}>To-Do List</h3>
        </div>
      </Link>
      <Link to="/calendar" className={styles.actionLink}>
        <div className={styles.actionCard}>
          <CalendarIcon className={`${styles.actionIcon} ${styles.calendarIcon}`} />
          <h3 className={styles.actionTitle}>Calendar</h3>
        </div>
      </Link>
      <Link to="/journal" className={styles.actionLink}>
        <div className={styles.actionCard}>
          <Book className={`${styles.actionIcon} ${styles.journalIcon}`} />
          <h3 className={styles.actionTitle}>Journal</h3>
        </div>
      </Link>
    </div>
  </section>
  )
}

export default QuickActions