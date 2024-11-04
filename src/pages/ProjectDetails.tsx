import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import styles from './ProjectDetails.module.css';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

// Interface defining the shape of our project data
interface ProjectDetails {
  id: string;
  name: string;
  description?: string;  // Optional field
  createdAt: string;
  tasks?: Array<{        // Optional array of task objects
    id: string;
    name: string;
    completed: boolean;
    description?: string;  // Added to match Task type
    userId: string;        // Added to match Task type
  }>;
}

const ProjectDetailsPage: React.FC = () => {
  // Get the project ID from the URL parameters
  const { id } = useParams();
  // State to store the project details
  const [project, setProject] = useState<ProjectDetails | null>(null);
  // Loading state to show loading indicator
  const [isLoading, setIsLoading] = useState(true);
  const [newTaskName, setNewTaskName] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  //Add Handlers
  const handleTaskToggle = async (taskId: string) => {
    if (!project || !project.tasks) return;

    const updatedTasks = project.tasks.map(task =>
        task.id === taskId ? {...task, completed: !task.completed} : task
    );

    //update FireStone 
    await updateDoc(doc(db, 'projects', id!), {
        tasks: updatedTasks
    });

    setProject(prev => prev ? {...prev, tasks: updatedTasks} : null);
  };

  const handleAddTask = async () => {
    if (!newTaskName.trim() || !project) return;

    const newTask = {
      id: crypto.randomUUID(),
      name: newTaskName,
      completed: false,
      userId: "", // Add appropriate userId if needed
      projectId: id,
    };

    const updatedTasks = [...(project.tasks || []), newTask];
    
    await updateDoc(doc(db, 'projects', id!), {
      tasks: updatedTasks
    });

    setProject(prev => prev ? {...prev, tasks: updatedTasks} : null);
    setNewTaskName("");
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    // Function to fetch project details from Firestore
    const fetchProjectDetails = async () => {
      // Safety check for ID
      if (!id) {
        console.error('No project ID provided');
        setIsLoading(false);
        return;
      }

      try {
        // Fetch the project document from Firestore
        const projectDoc = await getDoc(doc(db, 'projects', id));
        if (projectDoc.exists()) {
          // If document exists, set the project state with the data
          setProject({
            id: projectDoc.id,
            ...projectDoc.data()
          } as ProjectDetails);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]); // Re-run effect when ID changes

  // Show loading state while fetching data
  if (isLoading) {
    return <div>Loading project details...</div>;
  }

  // Show error state if project not found
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    // Main container for the entire page
    <div className={styles.container}>
      {/* Wrapper for content alignment */}
      <div className={styles.wrapper}>
        {/* Back button navigation that links to the todo page */}
        <Link to="/todo">
          <Button variant="ghost" className={styles.backButton}>
            <ArrowLeft className="mr-2 h-4 w-4" /> {/* Arrow icon with margin */}
            Back to Projects
          </Button>
        </Link>

        {/* Main project information card */}
        <div className={styles.projectCard}>
          {/* Project name section */}
          <h3>Project Name:</h3>
          <h1 className={styles.projectTitle}>{project.name}</h1>
          
          {/* Project description section - only shows if description exists */}
          <h3>Project Description:</h3>
          {project.description && (
            <p className={styles.projectDescription}>{project.description}</p>
          )}

          {/* Project details section showing creation date */}
          <div className="mb-6">
            <h2 className={styles.sectionTitle}>Project Details</h2>
            <p className={styles.projectDescription}>
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Tasks section - only renders if there are tasks */}
          <div>
            <div className={styles.projectTasks}>
              <h2 className={styles.sectionTitle}>Tasks</h2>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button 
                    className={styles.addProjectTaskButton} 
                    onClick={() => setIsPopoverOpen(true)}
                  >
                    Add Project task
                  </button>
                </PopoverTrigger>
                <PopoverContent className={styles.popoverContent}>
                  <div className="grid gap-4">
                    <h4 className="font-medium leading-none">Add New Task</h4>
                    <div className="grid gap-2">
                      <Input
                        id="taskName"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="Enter task name"
                      />
                      <Button onClick={handleAddTask}>Add Task</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Only show task list if there are tasks */}
            {project.tasks && project.tasks.length > 0 && (
              <ul className={styles.taskList}>
                {project.tasks.map(task => (
                  <li 
                    key={task.id}
                    className={styles.taskItem}
                    onClick={() => handleTaskToggle(task.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className={task.completed ? styles.taskCompleted : ''}>
                      {task.name}
                    </span>
                    <span className={`${styles.statusBadge} ${
                      task.completed ? styles.statusCompleted : styles.statusInProgress
                    }`}>
                      {task.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage; 