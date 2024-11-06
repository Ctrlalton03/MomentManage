import React, { useState, useEffect } from "react"
import CalendarHeader from "@/components/Calender/CalenderHeader"
import CalendarGrid from "@/components/Calender/CalenderGrid"
import EventsList from "@/components/Calender/EventList"
import { Event, eventTypes } from "@/components/Calender/types"
import { db } from "@/config/firebase"
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import styles from '@/styles/modules/Calender/CalendarPage.module.css'


const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = React.useState<Event[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const eventsRef = collection(db, "events")
    const userEventsQuery = query(eventsRef, where("userId", "==", user.uid))

    const unsubscribe = onSnapshot(userEventsQuery, (snapshot) => {
      const eventsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date.toDate()) // Convert Firestore Timestamp to Date
      })) as Event[]
      setEvents(eventsList)
    })

    return () => unsubscribe()
  }, [user])
 
 
 
 
  const navigate = useNavigate()
 
 
 
 
 
  const handleEventCreate = async (newEvent: Omit<Event, 'id'>) => {
    if (!user) return

    try {
      await addDoc(collection(db, "events"), {
        ...newEvent,
        userId: user.uid,
        createdAt: new Date()
      })
    } catch (error) {
      console.error("Error creating event:", error)
      // You might want to show an error toast here
    }
  }

  const handleEventDelete = async (eventId: string) => {
    if (!user) return

    try {
      await deleteDoc(doc(db, "events", eventId))
    } catch (error) {
      console.error("Error deleting event:", error)
      // You might want to show an error toast here
    }
  }
  return (
    <div className={styles.container}>
      <CalendarHeader />
      <button
          onClick={() => navigate('/dashboard')}
          className={styles.backButton}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Dashboard
        </button>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CalendarGrid
            date={date}
            setDate={setDate}
            events={events}
            eventTypes={eventTypes}
          />
          <EventsList 
            events={events}
            onEventCreate={handleEventCreate}
            onEventDelete={handleEventDelete}
          />
        </div>
      </main>
    </div>
  )
}

export default CalendarPage