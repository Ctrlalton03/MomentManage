// src/components/TaskList/TaskList.tsx
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';
import { Task } from '@/types';
import { collection, query, where, orderBy, getDocs } from '@firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext'; // Adjust import path as needed

interface TaskListProps {
  onToggle: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onToggle }) => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth(); // Get the current user

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

    if (!user) {
        return (
            <div className="text-center py-4 text-gray-400">
                Please sign in to view your tasks
            </div>
        );
    }

    return (
        <section>
            {isLoading ? (
                <div>Loading front page...</div>
            ) : (
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">Current Tasks</h3>
                    <Link to="/add-task">
                        <Button variant="secondary">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Task
                        </Button>
                    </Link>
                </div>
            )}
            <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-4 space-y-4">
                    <ul className="space-y-2">
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                {...task}
                                onToggle={() => onToggle(task.id)}
                            />
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </section>
    );
};

export default TaskList;