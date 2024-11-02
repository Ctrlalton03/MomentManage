import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from '@firebase/firestore';
import {getAuth} from 'firebase/auth';

interface TaskFormData {
  name: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
}

const AddTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    priority: 'medium',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!auth.currentUser){
        console.error('No User is Signed In')
        return;
    }

    try{
        await addDoc(collection(db, 'tasks'), {
            ...formData,
            description: formData.description.trim(),
            userId: auth.currentUser.uid,
            createdAt: new Date().toISOString(),
            completed: false,
        });
        navigate('/todo');
    } catch (error) {
        console.error('Failed to create task:', error);
        alert('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center text-zinc-300 hover:text-white"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Dashboard
        </button>

        <div className="max-w-md mx-auto bg-zinc-800 rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Add New Task</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Task Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
                required
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1">
                Priority Level
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskFormData['priority'] })}
                className="w-full px-3 py-2 bg-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Add Task
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddTaskPage;
