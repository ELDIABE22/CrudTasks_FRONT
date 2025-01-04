import { Props } from './taskForm.type';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTask } from '@/hooks/useTask';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useEffect } from 'react';

const TaskForm = ({
  typeAction,
  onSubmit,
  formTask,
  categoryId,
  dataFormUpdate,
}: Props) => {
  const { closeDialog } = useTask();

  useEffect(() => {
    if (typeAction === 'update') {
      formTask.reset({
        id: dataFormUpdate?._id,
        title: dataFormUpdate?.title,
        description: dataFormUpdate?.description,
        category: categoryId,
      });
    } else {
      formTask.reset({
        category: categoryId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...formTask}>
      <form onSubmit={formTask.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={formTask.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Título</FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="Tarea de matemáticas..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formTask.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Descripción</FormLabel>
              <FormControl>
                <Textarea
                  className="text-black"
                  placeholder="Lo que tienes que hacer en la tarea..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            className="bg-white text-slate-900 hover:bg-white/60"
          >
            {typeAction === 'update' ? 'Actualizar' : 'Crear'}
          </Button>
          <Button
            type="button"
            className="hover:text-red-500"
            onClick={closeDialog}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TaskForm;
