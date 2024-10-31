// src/pages/dashboard.tsx
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { Header } from "@/components/layout/DashboardHeader"
import { TopTask } from "@/components/Dashboard/TopTask"
import { QuickActions } from "@/components/Dashboard/QuickActions"
import { RecentActivity } from "@/components/Dashboard/RecentActivity"
import { TodoItem, ActivityItem } from "@/types"
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import styles from './Dashboard.module.css'

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: "Complete project proposal", completed: false },
    { id: 2, text: "Schedule team meeting", completed: false },
    { id: 3, text: "Prepare presentation", completed: false },
  ])
  const [recentActivities] = useState<ActivityItem[]>([
    { id: 1, type: 'todo', action: 'Added new task: Review quarterly report', timestamp: '2 hours ago' },
    { id: 2, type: 'calendar', action: 'Scheduled meeting: Team Sync', timestamp: '4 hours ago' },
    { id: 3, type: 'journal', action: 'Created new journal entry', timestamp: 'Yesterday at 9:30 PM' },
    { id: 4, type: 'todo', action: 'Completed task: Update client presentation', timestamp: 'Yesterday at 3:15 PM' },
  ])
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        navigate('/login') // Redirect to login if no user
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % todos.length)
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(interval)
  }, [todos.length])

  const toggleTaskCompletion = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const currentTask = todos[currentTaskIndex]

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null // This shouldn't show as navigate will redirect
  }

  const username = user.displayName || user.email

  return (
    <div className={styles.container}>
      <Header username={username} />
      <main className={styles.mainContent}>
        <section className={styles.welcomeSection}>
          <h2 className={styles.welcomeHeading}>
            Welcome back, <span className={styles.usernameHighlight}>{username}</span>
          </h2>
          <TopTask task={currentTask} onToggleComplete={toggleTaskCompletion} />
        </section>
        <QuickActions />
        <section className={styles.activitySection}>
          <RecentActivity activities={recentActivities} />
        </section>
        <section className={styles.logoutSection}>
          <Button 
            variant="outline" 
            className={styles.logoutButton}
          >
            <LogOut className={styles.logoutIcon} /> Log Out
          </Button>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage