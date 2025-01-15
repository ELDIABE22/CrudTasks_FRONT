import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { formCategorySchema, formTaskSchema } from '@/lib/zod';
import { createContext, useState } from 'react';
import {
  ICategoryContext,
  IDialogStateContext,
  ITaskContext,
  ITaskContextValue,
  Props,
} from './taskContext.type';
import { handleAxiosError, instance } from '@/lib/axios';

export const TaskContext = createContext<ITaskContextValue | null>(null);

export const TaskProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<ITaskContext[] | []>([]);
  const [categorys, setCategorys] = useState<ICategoryContext[] | []>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Estado para abrir y cerrar el DialogCategory
  const [dialogState, setDialogState] = useState<IDialogStateContext>({
    isOpen: false,
    mode: null,
  });

  const { user } = useAuth();

  // Funciones para abrir el dialog en diferentes modos
  const openAsNew = () => setDialogState({ isOpen: true, mode: 'new' });

  const openAsUpdate = () => setDialogState({ isOpen: true, mode: 'update' });

  const closeDialog = () => setDialogState({ ...dialogState, isOpen: false });

  const formCategory = useForm<z.infer<typeof formCategorySchema>>({
    resolver: zodResolver(formCategorySchema),
    defaultValues: {
      id: '',
      name: '',
      description: '',
    },
  });

  const formTask = useForm<z.infer<typeof formTaskSchema>>({
    resolver: zodResolver(formTaskSchema),
    defaultValues: {
      id: '',
      title: '',
      description: '',
      category: '',
    },
  });

  const getTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await instance.get('/task');
      setTasks(res.data);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const getIdTask = async (idCategory: string) => {
    setLoadingTasks(true);
    try {
      const res = await instance.get(`/task/${idCategory}`);
      setTasks(res.data);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const newTask = async (values: z.infer<typeof formTaskSchema>) => {
    if (!user) {
      return <Navigate to="/auth/login" />;
    }

    const { title, description, category } = values;

    const dataTask = {
      title,
      description,
      category,
      user: user?.id,
    };

    setLoadingTasks(true);
    try {
      const res = await instance.post('/task/new', dataTask);

      const { status, data } = res;

      if (status === 201) {
        toast({
          variant: 'default',
          color: 'green',
          title: data.message,
        });

        formTask.reset({
          title: '',
          description: '',
          category: '',
        });

        getIdTask(category);

        closeDialog();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const updateTask = async (values: z.infer<typeof formTaskSchema>) => {
    if (!user) {
      return <Navigate to="/auth/login" />;
    }

    const { id, title, description, category } = values;

    const dataTask = {
      title,
      description,
      category,
      user: user?.id,
    };

    setLoadingTasks(true);
    try {
      const res = await instance.put(`/task/update/${id}`, dataTask);

      const { data, status } = res;

      if (status === 200) {
        toast({
          variant: 'default',
          color: 'green',
          title: data.message,
        });

        formTask.reset({
          id: '',
          title: '',
          description: '',
          category: '',
        });

        getIdTask(category);

        closeDialog();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const updateStateTask = async (
    id: string,
    categoryId: string | undefined,
    state: string
  ) => {
    setLoadingTasks(true);
    try {
      const res = await instance.put(`/task/update/${id}`, {
        category: categoryId,
        user: user?.id,
        state,
      });

      const { data, status } = res;

      if (status === 200) {
        toast({
          variant: 'default',
          color: 'green',
          title: data.message,
        });

        if (categoryId) getIdTask(categoryId);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const deleteTask = async (id: string, categoryId: string | undefined) => {
    if (!categoryId) return console.log('Falta el id de la categoría');

    setLoadingTasks(true);
    try {
      const res = await instance.delete(`/task/delete/${id}`);

      const { data, status } = res;

      if (status === 200) {
        toast({
          variant: 'default',
          color: 'green',
          title: data.message,
        });

        getIdTask(categoryId);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const getCategory = async () => {
    setLoadingCategories(true);
    try {
      const res = await instance.get('/category');
      setCategorys(res.data);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const getIdCategory = async (idUser: string) => {
    setLoadingCategories(true);
    try {
      const res = await instance.get(`/category/${idUser}`);
      setCategorys(res.data);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const newCategory = async (values: z.infer<typeof formCategorySchema>) => {
    if (!user) {
      return <Navigate to="/auth/login" />;
    }

    const { name, description } = values;

    const dataCategory = {
      user: user?.id,
      name,
      description,
    };

    setLoadingCategories(true);
    try {
      const res = await instance.post('/category/new', dataCategory);

      const { status, data } = res;

      if (status === 201) {
        toast({
          variant: 'default',
          color: 'green',
          title: data.message,
        });

        formCategory.reset({
          name: '',
          description: '',
        });

        getIdTask(user.id);
        getIdCategory(user.id);
        closeDialog();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const updateCategory = async (values: z.infer<typeof formCategorySchema>) => {
    if (!user) {
      return <Navigate to="/auth/login" />;
    }

    const { id, name, description } = values;

    const dataCategory = {
      user: user?.id,
      name,
      description,
    };

    setLoadingCategories(true);
    try {
      const res = await instance.put(`/category/update/${id}`, dataCategory);

      const { status, data } = res;

      if (status === 201) {
        toast({
          variant: 'default',
          color: 'green',
          title: data.message,
        });

        formCategory.reset({
          name: '',
          description: '',
        });

        getIdTask(user.id);
        getIdCategory(user.id);
        getTasks();
        closeDialog();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!user) {
      return <Navigate to="/auth/login" />;
    }

    setLoadingCategories(true);
    try {
      const res = await instance.delete(`/category/delete/${id}`);

      const { status, data } = res;

      if (status === 200) {
        toast({
          variant: 'default',
          color: 'green',
          title: data.message,
        });

        getIdTask(user.id);
        getIdCategory(user.id);
        getTasks();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categorys,
        loadingTasks,
        loadingCategories,
        dialogState,
        setDialogState,
        formCategory,
        formTask,
        openAsNew,
        openAsUpdate,
        closeDialog,
        getTasks,
        getIdTask,
        newTask,
        updateTask,
        updateStateTask,
        deleteTask,
        getCategory,
        getIdCategory,
        newCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
