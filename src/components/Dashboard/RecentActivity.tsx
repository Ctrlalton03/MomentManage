// src/components/dashboard/RecentActivity.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar as CalendarIcon, Book, Clock } from "lucide-react"
import { ActivityItem } from '@/types'

interface RecentActivityProps {
  activities: ActivityItem[]
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'todo':
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case 'calendar':
        return <CalendarIcon className="h-4 w-4 text-green-500" />
      case 'journal':
        return <Book className="h-4 w-4 text-purple-500" />
    }
  }

  return (
    <Card className="bg-zinc-800 border-zinc-700 shadow-md shadow-blue-500/10">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-blue-400" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start">
              <div className="mr-3 mt-1">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">{activity.action}</p>
                <p className="text-xs text-zinc-400">{activity.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default RecentActivity;