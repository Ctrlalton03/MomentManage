export interface Event {
    id: string
    title: string
    date: Date
    type: "meeting" | "deadline" | "personal"
    userId: string
    createdAt: Date
  }
  
  export const eventTypes = {
    meeting: { color: "bg-blue-500" },
    deadline: { color: "bg-red-500" },
    personal: { color: "bg-green-500" },
  }