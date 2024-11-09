import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, ChevronRight, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { collection, query, getDocs, orderBy, limit, where } from "firebase/firestore"
import { db } from "@/config/firebase"
import { useAuth } from "@/context/AuthContext"
import styles from '@/styles/modules/Dashboard/UpcomingEvents.module.css'


interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    time: string;
    userId: string;
  };


const UpcomingEvents: React.FC = () => {

  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth();

  useEffect(() => {
    const grabEvents = async () => {
      try{
        const eventsRef = collection(db, 'events')
        const q = query(
          eventsRef,
          where('userId', '==', user?.uid),
          orderBy('date', 'asc'),
          limit(5)
        );

        const querySnapshot = await getDocs(q);
        const eventsList = querySnapshot.docs.map(docs => ({
          id: docs.id,
          ...docs.data(),
          date: new Date(docs.data().date.toDate())
        })) as CalendarEvent[];

        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    }
    grabEvents();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }



  return (
    <div className={styles.container}>
        <div className={styles.title}>
            <CalendarIcon className={styles.icon} />
            <h1>Upcoming Events</h1>
        </div>
        <Card className={styles.card}>
            <CardContent>
                <ul className={styles.list}>
                {events.map((event) => (
                <li key={event.id} className={styles.item}>
                <div className={styles.itemHeader}>
                    <span className={styles.itemTitle}>{event.title}</span>
                    <ChevronRight className={styles.chevron} />
                </div>
                <div className={styles.itemDetails}>
                    <CalendarIcon className={styles.itemIcon} />
                    <span>{event.date.toLocaleDateString()}</span>
                    <Clock className={styles.timeIcon} />
                    <span>{event.time}</span>
                    </div>
                    </li>
                ))}
                </ul>
            </CardContent>
        </Card> 
    </div>
    
  )
}

export default UpcomingEvents