import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IAuthContextValue, IAuthUser, Props } from './authContext.type';
import { createContext, useEffect, useState } from 'react';
import { formLoginSchema, formRegisterSchema } from '@/lib/zod';

import axios from 'axios';
import instance from '@/lib/axios';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext<IAuthContextValue | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const formRegister = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
  });

  const formLogin = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signup = async (values: z.infer<typeof formRegisterSchema>) => {
    setFormLoading(true);

    try {
      const res = await instance.post(`/auth/register`, values);

      if (res.status === 201) {
        toast({
          variant: 'default',
          title: res.data.message,
        });

        window.location.href = '/categorys';

        formRegister.reset({
          name: '',
          lastname: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status !== undefined &&
          error.response?.status >= 400 &&
          error.response?.status <= 499
        ) {
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
      }
    } finally {
      setFormLoading(false);
    }
  };

  const signin = async (values: z.infer<typeof formLoginSchema>) => {
    setFormLoading(true);

    try {
      const res = await instance.post(`/auth/login`, values);

      if (res.status === 202) {
        toast({
          variant: 'default',
          title: res.data.message,
        });

        window.location.href = '/categorys';

        formLogin.reset({
          email: '',
          password: '',
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status !== undefined &&
          error.response?.status >= 400 &&
          error.response?.status <= 499
        ) {
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
      }
    } finally {
      setFormLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('token');

    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await instance.get('/auth/verify');

        if (!res.data) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status !== undefined &&
            error.response?.status >= 400 &&
            error.response?.status <= 499
          ) {
            if (error.response?.status === 403)
              return <Navigate to="/auth/login" />;

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
        }
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signup,
        signin,
        logout,
        formRegister,
        formLogin,
        formLoading,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
