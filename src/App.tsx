// Main App component that handles routing and authentication
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import DashboardPage from './pages/Dashboard';
import TodoPage from './pages/TodoPage';
import AddTaskPage from './pages/add-task';
import ProjectForm from './components/ToDoList/Project-Form';
import ProjectDetailsPage from './pages/ProjectDetails';

function App() {
  return (
    // AuthProvider wraps the entire app to provide authentication context
    <AuthProvider>
      {/* Router handles navigation between different pages */}
      <Router>
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/add-task" element={<AddTaskPage />} />
          <Route path="/add-project" element={<ProjectForm />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
        </Routes>
      </Router> 
    </AuthProvider>
  );
}

export default App;
