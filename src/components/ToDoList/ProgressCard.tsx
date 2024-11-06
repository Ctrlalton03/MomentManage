import { Card, CardContent } from '@/components/ui/card';
import styles from '@/styles/modules/ToDoList/ProgressCard.module.css';

interface ProgressCardProps {
    completedTasksCount: number;
    totalTasks: number;
    progress: number;
  }

const ProgressCard: React.FC<ProgressCardProps> = ({ completedTasksCount, totalTasks }) => {

    const progress = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0;


  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <div className={styles.grid}>
          <div className="space-y-4">
            <div className={styles.statsContainer}>
              <h3 className={styles.title}>Current Progress</h3>
              <div className={styles.progressContainer}>
                <div className={styles.circleContainer}>
                  <svg className={styles.circle}>
                    <circle
                      className={styles.circleBackground}
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="30"
                      cx="32"
                      cy="32"
                    />
                    <circle
                      className={styles.circleForeground}
                      strokeWidth="4"
                      strokeDasharray={188.5}
                      strokeDashoffset={`${188.5 - ((progress || 0) / 100) * 188.5}`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="30"
                      cx="32"
                      cy="32"
                    />
                  </svg>
                  <div className={styles.percentage}>
                    {Math.round(progress)}%
                  </div>
                </div>
                <div className={styles.statsText}>
                  <div className={styles.statsLabel}>Tasks Completed</div>
                  <div className={styles.statsValue}>{completedTasksCount}/{totalTasks}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;