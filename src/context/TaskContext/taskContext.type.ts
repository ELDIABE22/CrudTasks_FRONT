import { z } from 'zod';
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formCategorySchema, formTaskSchema } from '@/lib/zod';

export type Props = {
  children: ReactNode;
};

export interface ITaskContext {
  _id: string;
  title: string;
  description: string;
  category: string;
  user: {
    id: string;
    name: string;
  };
  state: 'pending' | 'in progress' | 'review' | 'completed' | 'deleted';
}

export interface ICategoryContext {
  _id: string;
  user: {
    id: string;
    name: string;
  };
  name: string;
  description?: string;
  state: 'active' | 'desactive';
}

export interface IDialogStateContext {
  isOpen: boolean;
  mode: string | null;
}

export interface ITaskContextValue {
  tasks: ITaskContext[] | [];
  categorys: ICategoryContext[] | [];
  loadingTasks: boolean;
  loadingCategories: boolean;
  dialogState: IDialogStateContext;
  setDialogState: React.Dispatch<React.SetStateAction<IDialogStateContext>>;
  formCategory: UseFormReturn<{
    id?: string;
    name: string;
    description?: string | undefined;
  }>;
  formTask: UseFormReturn<{
    id?: string;
    description: string;
    title: string;
    category: string;
    state?:
      | 'pending'
      | 'in progress'
      | 'review'
      | 'completed'
      | 'deleted'
      | undefined;
  }>;
  openAsNew: () => void;
  openAsUpdate: () => void;
  closeDialog: () => void;
  getTasks: () => Promise<void>;
  getIdTask: (idCategory: string) => Promise<void>;
  newTask: (
    values: z.infer<typeof formTaskSchema>
  ) => Promise<JSX.Element | undefined>;
  updateTask: (
    values: z.infer<typeof formTaskSchema>
  ) => Promise<JSX.Element | undefined>;
  updateStateTask: (
    id: string,
    categoryId: string | undefined,
    state: string
  ) => void;
  deleteTask: (
    id: string,
    categoryId: string | undefined
  ) => Promise<void | JSX.Element>;
  getCategory: () => Promise<void>;
  getIdCategory: (idUser: string) => Promise<void>;
  newCategory: (
    values: z.infer<typeof formCategorySchema>
  ) => Promise<JSX.Element | undefined>;
  updateCategory: (
    values: z.infer<typeof formCategorySchema>
  ) => Promise<JSX.Element | undefined>;
  deleteCategory: (id: string) => void;
}
