// src/components/TaskList/TaskList.tsx
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';
import { Task } from '@/types';
import { collection, query, where, orderBy, getDocs, updateDoc, doc } from '@firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext'; 
import styles from './TaskList.module.css';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onTasksChange: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onTasksChange }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth(); 


    const handleToggle = async (taskId: string) => {
        const taskToUpdate = tasks.find(task => task.id === taskId);
        if (!taskToUpdate) return;

        try{
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, {
                completed: !taskToUpdate.completed
            });
            setTasks(tasks.map(task => 
                task.id === taskId 
                    ? { ...task, completed: !task.completed }
                    : task
            ));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };


    const handleDelete = (deletedId: string) => {
        setTasks(tasks.filter(task => task.id !== deletedId));
    };



    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const q = query(
                    collection(db, 'tasks'),
                    where('userId', '==', user?.uid),
                    orderBy('createdAt', 'desc')
                );
                
                const querySnapshot = await getDocs(q);
                const taskList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    completed: doc.data().completed,
                    userId: doc.data().userId
                })) as Task[];
                
                console.log('Fetched tasks:', taskList); // Add this line
                setTasks(taskList);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [user]);

    useEffect(() => {
        // Whenever tasks change, notify parent
        onTasksChange(tasks);
    }, [tasks, onTasksChange]);

    if (!user) {
        return (
            <div className={styles.signInMessage}>
                Please sign in to view your tasks
            </div>
        );
    }

    return (
        <section className={styles.container}>
            {isLoading ? (
                <div className={styles.loadingMessage}>Loading front page...</div>
            ) : (
                <div className={styles.header}>
                    <h3 className={styles.title}>Current Tasks</h3>
                    <Link to="/add-task">
                        <Button variant="secondary" className={styles.addButton}>
                            <Plus className={styles.addIcon} />
                            Add Task
                        </Button>
                    </Link>
                </div>
            )}
            <Card className={styles.taskCard}>
                <CardContent className={styles.cardContent}>
                    <ul className={styles.taskList}>
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                id={task.id}
                                name={task.name}
                                description={task.description}
                                completed={task.completed}
                                userId={task.userId}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                            />
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </section>
    );
};

export default TaskList;