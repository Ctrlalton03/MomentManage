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
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import styles from '@/styles/modules/Dashboard.module.css'
import { getDoc, doc, collection, query, where, getDocs, updateDoc } from "firebase/firestore"
import  UpcomingEvents  from "@/components/Dashboard/UpcomingEvents"
import { Card, CardContent } from "@/components/ui/card"

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [highPriorityTasks, setHighPriorityTasks] = useState<TodoItem[]>([])
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [recentActivities] = useState<ActivityItem[]>([
    { id: 1, type: 'todo', action: 'Added new task: Review quarterly report', timestamp: '2 hours ago' },
    { id: 2, type: 'calendar', action: 'Scheduled meeting: Team Sync', timestamp: '4 hours ago' },
    { id: 3, type: 'journal', action: 'Created new journal entry', timestamp: 'Yesterday at 9:30 PM' },
    { id: 4, type: 'todo', action: 'Completed task: Update client presentation', timestamp: 'Yesterday at 3:15 PM' },
  ])
  const navigate = useNavigate()
  const [events] = useState([
    { id: 1, title: "Team Meeting", date: "2024-03-20", time: "10:00 AM" },
    { id: 2, title: "Project Deadline", date: "2024-03-22", time: "5:00 PM" },
    { id: 3, title: "Client Presentation", date: "2024-03-25", time: "2:30 PM" },
  ])


  useEffect (() => {
    const fetchHighPriorityTasks = async () => {
      if (!user) return;

      try {
        const tasksQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', user.uid),
          where('priority', '==', 'high')
        );

        const querySnapshot = await getDocs(tasksQuery);
        const tasks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          text: doc.data().name || doc.data().text,
          completed: doc.data().status === 'completed',
          priority: 'high',
          userId: doc.data().userId
        })) as TodoItem[];

        console.log('Fetched high priority tasks:', tasks);
        setHighPriorityTasks(tasks);
      } catch (error) {
        console.error('Error fetching high priority tasks:', error);
      }
    };

    fetchHighPriorityTasks();
  }, [user])



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)

        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setUsername(userDoc.data().username)
        }

      } else {
        navigate('/login') 
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % highPriorityTasks.length)
    }, 10000) // Rotate every 10 seconds

    return () => clearInterval(interval)
  }, [highPriorityTasks.length])

  const toggleTaskCompletion = async (id: string) => {
    try{
      const taskRef = doc(db, 'tasks', id);
      const taskDoc = await getDoc(taskRef);

      if (taskDoc.exists()) {
        const newStatus = taskDoc.data().status === 'completed' ? 'pending' : 'completed';
        await updateDoc(taskRef, { status: newStatus });

        setHighPriorityTasks(prev => prev.map(task => 
          task.id === id ? {...task, completed: !task.completed} : task
        ));
      }
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  }

  const currentTask = highPriorityTasks[currentTaskIndex]

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null // This shouldn't show as navigate will redirect
  }

  const SignOut = async () => {
    try {
        await signOut(auth)
        navigate('/login')
    } catch (error) {
        console.error('Error signing out:', error)
    }
  }
  

  return (
    <div className={styles.container}>
      <Header username={username} />
      <main className={styles.mainContent}>
        <section className={styles.welcomeSection}>
          <h2 className={styles.welcomeHeading}>
            Welcome back, <span className={styles.usernameHighlight}>{username}</span>
          </h2>
          {highPriorityTasks.length > 0 && currentTask ? (
            <TopTask task={currentTask} onToggleComplete={toggleTaskCompletion} />
          ) : (
            <Card className={styles.card}>
              <CardContent className={styles.content}>
                <h3 className={styles.title}>No High Priority Tasks</h3>
                <p>Add some tasks to get started!</p>
              </CardContent>
            </Card>
          )}
        </section>
        <QuickActions />
        <UpcomingEvents events={events} />
        <section className={styles.activitySection}>
          <RecentActivity activities={recentActivities} />
        </section>
        <section className={styles.logoutSection}>
          <Button 
            variant="outline" 
            className={styles.logoutButton}
            onClick={SignOut}
          >
            <LogOut className={styles.logoutIcon} /> Log Out
          </Button>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage