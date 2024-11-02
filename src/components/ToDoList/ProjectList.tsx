// src/components/ProjectList/ProjectList.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Folder } from "lucide-react";
import { Project } from '@/types';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import styles from '@/styles/modules/ProjectList.module.css';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Current Projects</h3>
        <Link to="/add-project">
          <Button variant="outline" className={styles.addProjectButton}>
            <Plus className={styles.icon} />
            Add Project
          </Button>
        </Link>
      </div>
      <Card className={styles.projectCard}>
        <CardContent className={styles.cardContent}>
          {projects.map((project) => (
            <Button
              key={project.id}
              variant="outline"
              className={styles.projectButton}
            >
              <Folder className={styles.icon} />
              {project.name}
            </Button>
          ))}
          <Button variant="outline" className={styles.projectButton}>
            <Folder className={styles.icon} />
            Add Project
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProjectList;