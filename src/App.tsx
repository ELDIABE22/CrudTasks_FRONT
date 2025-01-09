import { Routes, Route } from 'react-router-dom';

import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutTask from './layouts/LayoutTask';
import CategoryPage from './page/CategoryPage';
import TaskPage from './page/TaskPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/categories"
          element={
            <LayoutTask>
              <CategoryPage />
            </LayoutTask>
          }
        />
        <Route
          path="/categories/:categoryName/:categoryId/tasks"
          element={
            <LayoutTask>
              <TaskPage />
            </LayoutTask>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
