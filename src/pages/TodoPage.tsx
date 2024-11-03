// src/pages/TodoList.tsx
import TodoHeader from "@/components/ToDoList/TodoHeader";
import ProgressCard from "@/components/ToDoList/ProgressCard";
import TaskList from "@/components/ToDoList/TaskList";
import ProjectList from "@/components/ToDoList/ProjectList";
import { Task, Project } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";


const TodoPage: React.FC = () => {
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const projects: Project[] = [];
  
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