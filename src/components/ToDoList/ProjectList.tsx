// src/components/ProjectList/ProjectList.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import styles from '@/styles/modules/ToDoList/ProjectList.module.css';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface ProjectListProps {
  projects: Project[];
}

// ProjectList component displays a list of projects and handles project deletion
const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  // Get authenticated user from context
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // Track which project is being deleted
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Handle project deletion
  const handleDelete = async (projectId: string) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this project?');

    if(!isConfirmed) {
      return;
    }

    try {
      // Set deletingId to show loading state
      setDeletingId(projectId);
      // Delete project from Firestore
      await deleteDoc(doc(db, 'projects', projectId));
      alert('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    } finally {
      // Reset deletingId after operation completes
      setDeletingId(null);
    }
  }

  // Set loading state based on user authentication
  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading projects... Please wait.</p>
        {!user && <p>Waiting for authentication...</p>}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your Projects</h2>
        <Link to="/add-project">
          <Button variant="secondary" className={styles.addButton}>
            <Plus className={styles.addIcon} />
            Add Project
          </Button>
        </Link>
      </div>
      <div className={styles.projectList}>
        {projects.map(project => (
          <div key={project.id} className={styles.projectItem}>
            <Link 
              to={`/project/${project.id}`}
              className="flex-grow hover:text-blue-400 transition-colors"
            >
              {project.name}
            </Link>
            <button 
              onClick={() => handleDelete(project.id.toString())}
              className="text-red-500 hover:text-red-600"
              disabled={deletingId === project.id.toString()}
              >
              {deletingId === project.id.toString() ? (
                <span className="animate-spin">🔄</span>
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;