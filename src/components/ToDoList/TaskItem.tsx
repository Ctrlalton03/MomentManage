// src/components/TaskList/TaskItem.tsx
import React from 'react';
import { CheckCircle2 } from "lucide-react";

interface TaskItemProps {
  id: string;
  name: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  id, 
  name, 
  completed, 
  onToggle 
}) => {
  return (
    <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-700/50 transition-colors">
      <button
        onClick={() => onToggle(id)}
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors
          ${completed ? 'bg-blue-500 border-blue-500' : 'border-zinc-500'}`}
      >
        {completed && <CheckCircle2 className="h-4 w-4 text-white" />}
      </button>
      <span className={`flex-grow text-white ${completed ? 'line-through text-zinc-500' : ''}`}>
        {name}
      </span>
    </li>
  );
};

export default TaskItem;