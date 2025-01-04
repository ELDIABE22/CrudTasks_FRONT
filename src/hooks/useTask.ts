import { TaskContext } from '@/context/TaskContext/TaskContext';
import { useContext } from 'react';

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error('useTask debe usarse dentro de un TaskProvider');

  return context;
};
