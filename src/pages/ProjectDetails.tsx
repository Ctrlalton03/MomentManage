import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ProjectDetails {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  tasks?: Array<{
    id: string;
    name: string;
    completed: boolean;
  }>;
  // Add any other project details you want to display
}

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams(); // Change from projectId to id
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {

      if (!id) {
        console.error('No project ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const projectDoc = await getDoc(doc(db, 'projects', id));
        if (projectDoc.exists()) {
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
  }, [id]);

  if (isLoading) {
    return <div>Loading project details...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/todo">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>

        <div className="bg-zinc-800 rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
          
          {project.description && (
            <p className="text-zinc-300 mb-6">{project.description}</p>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Project Details</h2>
            <p className="text-zinc-300">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
          </div>

          {project.tasks && project.tasks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Tasks</h2>
              <ul className="space-y-2">
                {project.tasks.map(task => (
                  <li 
                    key={task.id}
                    className="flex items-center justify-between bg-zinc-700 p-3 rounded"
                  >
                    <span className={task.completed ? 'line-through text-zinc-400' : ''}>
                      {task.name}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      task.completed ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {task.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage; 