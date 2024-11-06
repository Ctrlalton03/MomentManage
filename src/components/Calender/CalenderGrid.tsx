import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Event } from "./types"
import styles from "@/styles/modules/Calender/CalendarGrid.module.css"


interface CalendarGridProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  events: Event[]
  eventTypes: Record<string, { color: string }>
}

// Helper function to filter events for a specific day
const CalendarGrid: React.FC<CalendarGridProps> = ({ date, setDate, events, eventTypes }) => {
  const getDayEvents = (day: Date) => {
    return events.filter(event => 
      // Match events that occur on the same day, month, and year
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    )
  }

  // Hook for programmatic navigation
  

  return (
    <>
     {/* Back to Dashboard button with arrow icon */}
     
        {/* Calendar card wrapper */}
        <Card className={styles.card}>
        <CardContent>
        <Calendar
          mode="single"              // Multiple date selection mode
          selected={date}            // Currently selected date
          onSelect={setDate}         // Handler for date selection
          className={styles.calendar}
          modifiers={{
            // Add custom modifier for days with events
            hasEvent: (date) => getDayEvents(date).length > 0,
          }}
          modifiersClassNames={{
            // Apply custom CSS class to days with events
            hasEvent: styles.hasEvent,
          }}
          components={{
            // Custom rendering for each day cell
            DayContent: ({ date }) => (
              <div className={styles.dayContent}>
                {date.getDate()}     {/* Display day number */}
                <div className={styles.eventDots}>
                  {/* Render colored dots for each event on this day */}
                  {getDayEvents(date).map((event) => (
                    <div
                      key={event.id}
                      className={`${styles.eventDot} ${eventTypes[event.type].color}`}
                    />
                  ))}
                </div>
              </div>
            ),
          }}
        />
      </CardContent>
    </Card>
    </>
    
  )
}

export default CalendarGrid