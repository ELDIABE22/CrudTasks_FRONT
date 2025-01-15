import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');
export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (
      error.response?.status !== undefined &&
      error.response?.status >= 400 &&
      error.response?.status <= 499
    ) {
      if (error.response?.status === 403) {
        toast({
          variant: 'destructive',
          title: 'Acceso denegado',
          description: 'Por favor, inicia sesión nuevamente.',
        });

        return (window.location.href = '/auth/login');
      }

      toast({
        variant: 'destructive',
        title: error.response?.data.message,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error interno!',
        description:
          'Lo sentimos, estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  } else {
    toast({
      variant: 'destructive',
      title: 'Error desconocido!',
      description:
        'Ocurrió un error desconocido. Por favor, inténtalo de nuevo más tarde.',
    });
  }
};
