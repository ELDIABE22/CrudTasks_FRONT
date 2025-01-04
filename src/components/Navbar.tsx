import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useAuth();

  const { pathname } = useLocation();

  return (
    <nav className="min-h-20 bg-slate-900 flex flex-col sm:flex-row items-center justify-between py-5 px-5 sm:px-10 rounded-2xl border border-white">
      <div className="flex items-center space-x-2 sm:space-x-5">
        {pathname.includes('/categorys/') && (
          <Link to="/categorys">
            <Button variant="ghost" size="icon" className="text-white h-8 w-8 sm:h-10 sm:w-10">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}

        <h1 className="text-white font-bold text-2xl sm:text-4xl">CRUD TASK</h1>
      </div>
      <Button onClick={logout}>Cerrar Sesión</Button>
    </nav>
  );
};

export default Navbar;
