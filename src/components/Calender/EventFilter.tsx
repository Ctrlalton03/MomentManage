import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import styles from '@/styles/modules/Calender/EventFilter.module.css'


interface EventFilterProps {
    onFilterChange: (value: string) => void;
  }




const EventFilter: React.FC<EventFilterProps> = ({ onFilterChange }) => {
    return (
        <div className={styles.container}>
            <label htmlFor="eventFilter" className={styles.label}>
                Filter events by type:
            </label>
            <Select onValueChange={onFilterChange}>
                <SelectTrigger id="eventFilter">
                    <SelectValue className={`${styles.selectValue} text-white placeholder:text-white`} placeholder="Select the event type" />
                </SelectTrigger>
                <SelectContent className="text-black">
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default EventFilter
