import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, ChevronRight, Clock } from "lucide-react"
import styles from '@/styles/modules/UpcomingEvents.module.css'

interface UpcomingEventsProps {
  events: {
    id: number;
    title: string;
    date: string;
    time: string;
  }[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
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
                    <span>{event.date}</span>
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