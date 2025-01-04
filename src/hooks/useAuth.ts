import { AuthContext } from '@/context/AuthContext/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth debe usarse dentro de un AuthProvider');

  return context;
};