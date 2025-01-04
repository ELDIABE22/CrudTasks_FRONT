import { Props } from './categoryForm.type';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

const CategoryForm = ({
  dataFormUpdate,
  typeAction,
  onSubmit,
  onCancel,
  formCategory,
}: Props) => {
  useEffect(() => {
    if (!dataFormUpdate) return;

    const { _id, name, description } = dataFormUpdate;

    if (typeAction === 'update') {
      formCategory.reset({
        id: _id,
        name,
        description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...formCategory}>
      <form
        onSubmit={formCategory.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={formCategory.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nombre</FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="Proyectos..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formCategory.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Descripción</FormLabel>
              <FormControl>
                <Textarea
                  className="text-black"
                  placeholder="Actividades relacionadas con proyectos específicos..."
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
            onClick={onCancel}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CategoryForm;
