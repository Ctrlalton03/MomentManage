import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Event, eventTypes } from "./types"
import EventFilter from "./EventFilter"
import CreateEventDialog from "./CreateEventDialog"




interface EventsListProps {
  events: Event[]
  onEventCreate: (event: Omit<Event, 'id'>) => void
  onEventDelete: (eventId: string) => void
}

const EventsList: React.FC<EventsListProps> = ({ events, onEventCreate, onEventDelete }) => {
    const [filter, setFilter] = React.useState('all');

    const filterEvents = React.useMemo(() => {
        if (filter === 'all') return events
        return events.filter(event => event.type === filter)
    }, [events, filter])


  return (
    <Card className="bg-zinc-800/50 border-zinc-700">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex justify-between items-center">
          Events
          <CreateEventDialog onEventCreate={onEventCreate} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <EventFilter onFilterChange={setFilter} />
          <ul className="space-y-2">
            {filterEvents.map(event => (
              <li key={event.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-zinc-700/50">
                <div className={`w-3 h-3 rounded-full ${eventTypes[event.type].color}`} />
                <div className="flex-grow">
                  <p className="text-white font-medium">{event.title}</p>
                  <p className="text-zinc-400 text-sm">
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <button
                  onClick={() => onEventDelete(event.id)}
                  className="text-zinc-400 hover:text-red-400 p-2 rounded-full hover:bg-zinc-700/50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventsList