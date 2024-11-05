import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from '@/context/AuthContext';
import styles from './ProjectForm.module.css';

const ProjectForm: React.FC = () => {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in to create a project');
            return;
          }

        if (!projectName.trim()) {
            setError("Project name cannot be empty");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await addDoc(collection(db, 'projects'), {
                name: projectName.trim(),
                userId: user.uid,
                createdAt: new Date().toISOString(),
                description: projectDescription.trim(),
                tasks: []
            });

            navigate('/todo');
        } catch (error) {
            console.error("Failed to create project", error);
            setError("Failed to create project");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/todo');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Create New Project</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.fieldGroup}>
                    <label htmlFor="projectName" className={styles.label}>
                        Project Name
                    </label>
                    <input 
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Enter project name"
                        disabled={isLoading}
                        className={styles.input}
                    />
                </div> 
                <div className={styles.fieldGroup}>
                    <label htmlFor="projectDescription" className={styles.label}>
                        Description
                    </label>
                    <textarea
                        id="projectDescription"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Enter project description"
                        disabled={isLoading}
                        className={styles.textarea}
                    />
                </div>
                {error && (
                    <div className={styles.error}>{error}</div>
                )}
                <div className={styles.buttonGroup}>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Creating...' : 'Create'}
                    </button>
                    <button 
                        type="button" 
                        onClick={handleCancel} 
                        disabled={isLoading}
                        className={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
