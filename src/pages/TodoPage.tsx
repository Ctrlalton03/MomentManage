// src/pages/TodoList.tsx
import TodoHeader from "@/components/ToDoList/TodoHeader";
import ProgressCard from "@/components/ToDoList/ProgressCard";
import TaskList from "@/components/ToDoList/TaskList";
import ProjectList from "@/components/ToDoList/ProjectList";
import { Task, Project } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, orderBy, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "@/config/firebase";


const TodoPage: React.FC = () => {
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [tasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useAuth();


  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'projects'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Project, 'id'>)
      }));
      setProjects(projectsData);
    });

    return () => {
      unsub();
    };
  }, [user]);




  
  return (
    <div className="min-h-screen bg-zinc-900">
      <TodoHeader />
      <main className="container mx-auto px-4 py-8">
        <Link to="/dashboard"> 
          <Button>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button> 
        </Link>
        
        <ProgressCard
          completedTasksCount={completedTasksCount}
          totalTasks={totalTasks}
          progress={totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0}
        />

        <TaskList 
          tasks={tasks}
          onToggle={(_id: string) => {}} 
          onTasksChange={(tasks: Task[]): void => {
            setCompletedTasksCount(tasks.filter(task => task.completed).length);
            setTotalTasks(tasks.length);
          }}
        />
        
        <div className="space-y-8">
          <ProjectList projects={projects} />
        </div>
      </main>
    </div>
  );
};
    

export default TodoPage;