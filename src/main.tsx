import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './context/AuthContext/AuthContext.tsx';
import { TaskProvider } from './context/TaskContext/TaskContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <Router>
          <App />
          <Toaster />
        </Router>
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
);
