// src/components/dashboard/RecentActivity.tsx
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar as CalendarIcon, Book, Clock } from "lucide-react"
import { ActivityItem } from '@/types'
import styles from '@/styles/modules/RecentActivity.module.css'

interface RecentActivityProps {
  activities: ActivityItem[]
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'todo':
        return <CheckCircle className={styles.todoIcon} />
      case 'calendar':
        return <CalendarIcon className={styles.calendarIcon} />
      case 'journal':
        return <Book className={styles.journalIcon} />
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Clock className={styles.titleIcon} />
        <h1>Recent Activity</h1>
      </div>
      <Card className={styles.card}>
      <CardContent>
        <ul className={styles.activityList}>
          {activities.map((activity) => (
            <li key={activity.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>{getActivityIcon(activity.type)}</div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}>{activity.action}</p>
                <p className={styles.activityTimestamp}>{activity.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
    </div>
    
  )
}

export default RecentActivity;