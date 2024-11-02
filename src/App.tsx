import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import DashboardPage from './pages/Dashboard';
import TodoPage from './pages/TodoPage';
import AddTaskPage from './pages/add-task';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/add-task" element={<AddTaskPage />} />
        </Routes>
      </Router> 
    </AuthProvider>
  );
}


export default App;
