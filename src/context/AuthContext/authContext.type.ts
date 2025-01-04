import { z } from 'zod';
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formLoginSchema, formRegisterSchema } from '@/lib/zod';

export type Props = {
  children: ReactNode;
};

export interface IAuthUser {
  id: string;
  name: string;
  lastname?: string;
  rol: 'admin' | 'user';
  state: 'active' | 'desactive';
}

export interface IAuthContextValue {
  isAuthenticated: boolean;
  user: IAuthUser | null;
  signup: (values: z.infer<typeof formRegisterSchema>) => Promise<void>;
  signin: (values: z.infer<typeof formLoginSchema>) => Promise<void>;
  logout: () => void;
  formRegister: UseFormReturn<{
    name: string;
    lastname: string;
    email: string;
    password: string;
  }>;
  formLogin: UseFormReturn<{
    email: string;
    password: string;
  }>;
  formLoading: boolean;
  loading: boolean;
}
