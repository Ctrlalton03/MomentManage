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
    id: string;  
    text: string;
    completed: boolean;
    priority: string;
    userId: string;
  }
  
  export interface ActivityItem {
    id: number
    type: 'todo' | 'calendar' | 'journal'
    action: string
    timestamp: string
  }

  export interface Task {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    userId: string;
  }

  export interface TaskItemProps extends Task {
    onToggle: () => void;
    }
  

  export interface Project {
    id: number;
    name: string;
  }

  