// src/components/dashboard/TopTask.tsx
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { TodoItem } from '@/types'
import styles from './TopTask.module.css'

interface TopTaskProps {
  task: TodoItem
  onToggleComplete: (id: string) => void
}

export const TopTask: React.FC<TopTaskProps> = ({ task, onToggleComplete }) => {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <h3 className={styles.title}>Current Priority</h3>
        <button
          onClick={() => onToggleComplete(task.id)}
          className={styles.taskButton}
        >
          <CheckCircle 
            className={`${styles.icon} ${
              task.completed ? styles.iconCompleted : styles.iconIncomplete
            }`} 
          />
          <span className={task.completed ? styles.textCompleted : ''}>
            {task.text}
          </span>
        </button>
      </CardContent>
    </Card>
  )
}

export default TopTask;