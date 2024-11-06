// src/components/TaskList/TaskItem.tsx
import React from 'react';
import { CheckCircle2, Trash2 } from "lucide-react";
import { deleteDoc, doc } from '@firebase/firestore';
import { db, auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import styles from '@/styles/modules/ToDoList/TaskItem.module.css';

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
    <li className={styles.taskItem}>
      <button
        onClick={() => onToggle(id)}
        className={`${styles.toggleButton} ${
          completed ? styles.toggleButtonCompleted : styles.toggleButtonUncompleted
        }`}
      >
        {completed && <CheckCircle2 className={styles.checkIcon} />}
      </button>
      <span className={`${styles.taskName} ${completed ? styles.taskNameCompleted : ''}`}>
        {name}
      </span>

      <button 
      onClick={handleDelete}
      className={styles.deleteButton}
      >
        <Trash2 className={styles.trashIcon} />
      </button>
    </li>
  );
};

export default TaskItem;