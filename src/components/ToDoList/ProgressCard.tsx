// src/components/ProgressCard/ProgressCard.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ProgressCardProps {
  completedTasksCount: number;
  totalTasks: number;
  progress: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ 
  completedTasksCount, 
  totalTasks, 
  progress 
}) => {
  return (
    <Card className="bg-blue-600 border-0 mb-8 overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Current Progress</h3>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16">
                  <svg className="h-16 w-16 transform -rotate-90">
                    <circle
                      className="text-blue-900"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="30"
                      cx="32"
                      cy="32"
                    />
                    <circle
                      className="text-white"
                      strokeWidth="4"
                      strokeDasharray={188.5}
                      strokeDashoffset={188.5 - (progress / 100) * 188.5}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="30"
                      cx="32"
                      cy="32"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                    {Math.round(progress)}%
                  </div>
                </div>
                <div className="text-white">
                  <div className="text-sm font-medium">Tasks Completed</div>
                  <div className="text-2xl font-bold">{completedTasksCount}/{totalTasks}</div>
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