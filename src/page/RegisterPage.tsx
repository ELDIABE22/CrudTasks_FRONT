import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const RegisterPage = () => {
  const { isAuthenticated, signup, formRegister, formLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/categorys');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <section className="flex justify-center items-center p-3 sm:p-0">
      <div className="w-[450px] min-h-80 bg-slate-900 rounded-3xl p-5 border border-white">
        <h1 className="text-slate-300 font-bold text-3xl text-center mb-1">
          REGISTRAR CUENTA
        </h1>
        <Form {...formRegister}>
          <form
            onSubmit={formRegister.handleSubmit(signup)}
            className="space-y-5"
          >
            <FormField
              control={formRegister.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={formLoading}
                      className="px-3 py-6 focus-visible:ring-offset-0"
                      placeholder="Juan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formRegister.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Apellido</FormLabel>
                  <FormControl>
                    <Input
                      disabled={formLoading}
                      className="px-3 py-6 focus-visible:ring-offset-0"
                      placeholder="Pérez"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formRegister.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">
                    Correo Electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={formLoading}
                      className="px-3 py-6 focus-visible:ring-offset-0"
                      placeholder="usuario@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formRegister.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      disabled={formLoading}
                      className="px-3 py-6 focus-visible:ring-offset-0"
                      placeholder="********"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center gap-3">
              <p className="text-slate-300 flex flex-col sm:flex-row items-center text-sm">
                ¿Ya tienes una cuenta?
                <Link
                  to="/auth/login"
                  className="text-slate-300 font-semibold ml-1"
                >
                  Iniciar Sesión
                </Link>
              </p>
              <Button type="submit" className="w-full bg-slate-300 text-black hover:bg-slate-300/70">
                Registrar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default RegisterPage;
