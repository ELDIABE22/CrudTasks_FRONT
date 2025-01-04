import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const LoginPage = () => {
  const { formLogin, signin, formLoading, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/categorys');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <section className="flex justify-center items-center p-3 sm:p-0">
      <div className="w-[450px] min-h-80 bg-slate-900 rounded-3xl p-5 border border-white">
        <h1 className="text-slate-300 font-bold text-3xl text-center mb-1">
          INICIAR SESIÓN
        </h1>
        <Form {...formLogin}>
          <form onSubmit={formLogin.handleSubmit(signin)} className="space-y-5">
            <FormField
              control={formLogin.control}
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
              control={formLogin.control}
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
            <div className="text-center">
              <div className="flex flex-col items-center gap-3">
                <p className="text-slate-300 text-sm">
                  ¿Aún no tienes cuenta?
                  <Link
                    to="/auth/register"
                    className="text-slate-300 font-semibold ml-1"
                  >
                    Registrarse
                  </Link>
                </p>
                <Button
                  disabled={formLoading}
                  type="submit"
                  className="w-full bg-slate-300 text-black hover:bg-slate-300/70"
                >
                  Iniciar Sesión
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default LoginPage;
