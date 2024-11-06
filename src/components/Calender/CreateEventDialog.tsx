import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { Event, eventTypes } from "@/components/Calender/types"
import { useAuth } from "@/context/AuthContext"

interface CreateEventDialogProps {
  onEventCreate: (event: Omit<Event, 'id'>) => void
}

const CreateEventDialog: React.FC<CreateEventDialogProps> = ({ onEventCreate }) => {
  const [title, setTitle] = React.useState("")
  const [type, setType] = React.useState<string>("")
  const [date, setDate] = React.useState<string>("")
  const { user } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return



    const selectedDate = new Date(date)
    const timezoneOffset = selectedDate.getTimezoneOffset() * 60000
    const adjustedDate = new Date(selectedDate.getTime() - timezoneOffset)





    onEventCreate({
      title,
      type: type as keyof typeof eventTypes,
      date: adjustedDate,
      userId: user.uid,
      createdAt: new Date()
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Event Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-zinc-700"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">
              Event Type
            </label>
            <Select onValueChange={setType} required>
              <SelectTrigger className="bg-zinc-700">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-zinc-700"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventDialog 