import { Props } from './dialogCategory.type';
import { Button } from '../../../ui/button';
import { useTask } from '@/hooks/useTask';
import { CirclePlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CategoryForm from './components/CategoryForm/CategoryForm';

const DialogCategory = ({
  dialogState,
  openAsNew,
  closeDialog,
  dataFormUpdate,
}: Props) => {
  const { formCategory, newCategory, updateCategory } =
    useTask();

  // Función para resetear formulario cada vez que se cierre el dialog
  const resetForm = () => {
    formCategory.reset({
      id: '',
      name: '',
      description: '',
    });

    closeDialog();
  };

  return (
    <Dialog onOpenChange={resetForm} open={dialogState.isOpen}>
      <Button className="mb-10" onClick={openAsNew}>
        <CirclePlus className="mr-2 h-4 w-4" /> Categoría
      </Button>
      {dialogState.mode === 'new' && (
        <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Agregar Categoría</DialogTitle>
            <DialogDescription>
              Agrega una categoría para tus tareas.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            typeAction="create"
            onSubmit={newCategory}
            onCancel={closeDialog}
            formCategory={formCategory}
          />
        </DialogContent>
      )}
      {dialogState.mode === 'update' && (
        <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">
              Actualizar Categoría
            </DialogTitle>
            <DialogDescription>
              Modifica los detalles de la categoría existente.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            typeAction="update"
            onSubmit={updateCategory}
            onCancel={closeDialog}
            formCategory={formCategory}
            dataFormUpdate={dataFormUpdate}
          />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default DialogCategory;
