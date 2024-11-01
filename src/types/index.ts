// Add your TypeScript interfaces and types here 
export interface Feature {
    icon: React.ElementType
    title: string
    description: string
  }
  
  export interface Testimonial {
    profilePicture: string
    name: string
    role: string
    quote: string
  }

  export interface TodoItem {
    id: number
    text: string
    completed: boolean
  }
  
  export interface ActivityItem {
    id: number
    type: 'todo' | 'calendar' | 'journal'
    action: string
    timestamp: string
  }