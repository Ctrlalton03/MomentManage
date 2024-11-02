// src/components/TaskList/TaskItem.tsx
import React from 'react';
import { CheckCircle2, Trash2 } from "lucide-react";
import { deleteDoc, doc } from '@firebase/firestore';
import { db, auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';


interface TaskItemProps {
    name: string;
    description: string;
    completed: boolean;
    userId: string;
    id: string;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ name, completed, id, userId, onToggle, onDelete }) => {
    const handleDelete = async () => {
        try {
            // Wait for auth state to be ready
            await new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    unsubscribe();
                    resolve(user);
                });
            });

            const currentUser = auth.currentUser;
            if (!currentUser) {
                console.error('No authenticated user');
                return;
            }
            
            console.log('Current User ID:', currentUser.uid);
            console.log('Task User ID:', userId);

            if (currentUser.uid !== userId) {
                console.error('User not authorized to delete this task');
                return;
            }

            await deleteDoc(doc(db, 'tasks', id));
            onDelete(id);
        } catch (error) {
            console.error('Error deleting task:', error);

            if (error instanceof Error) {
                console.error('Error message:', error.message);
            }
        }
    };

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

      <button 
      onClick={handleDelete}
      className="text-red-500 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  );
};

export default TaskItem;