import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/categoys');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <section className="flex justify-center items-center">
      <div>
        <h1 className="text-slate-300 font-bold text-5xl sm:text-7xl mb-5 text-center">CRUD TASK</h1>

        <div className="text-center flex flex-col gap-5 sm:flex-row">
          <Button
            asChild
            className="bg-slate-300 text-black hover:bg-slate-300/70 w-full"
          >
            <Link to="/auth/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild className="hover:bg-slate-300/10 w-full">
            <Link to="/auth/register">Registrarse</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
