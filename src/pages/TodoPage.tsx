// src/pages/TodoList.tsx
import TodoHeader from "@/components/ToDoList/TodoHeader";
import ProgressCard from "@/components/ToDoList/ProgressCard";
import TaskList from "@/components/ToDoList/TaskList";
import ProjectList from "@/components/ToDoList/ProjectList";
import { Task, Project } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const projects: Project[] = [];
  
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasksCount / tasks.length) * 100 : 0;
  
  const toggleTask = (id: string) => {
    setTasks(tasks.map((task: Task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
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
          totalTasks={tasks.length}
          progress={progress}
        />
        <div className="space-y-8">
          <TaskList tasks={tasks} onToggle={toggleTask} />
          <ProjectList projects={projects} />
        </div>
      </main>
    </div>
  );
};
    

export default TodoPage;