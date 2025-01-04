import { Props } from './dialogNewTask.type';
import { Button } from '@/components/ui/button';
import { useTask } from '@/hooks/useTask';
import { CirclePlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TaskForm from './components/TaskForm';

const DialogNewTask = ({ categoryId, dataFormUpdate }: Props) => {
  const { formTask, closeDialog, dialogState, openAsNew, newTask, updateTask } = useTask();

  const resetForm = () => {
    formTask.reset({
      title: '',
      description: '',
    });

    closeDialog();
  };

  return (
    <Dialog onOpenChange={resetForm} open={dialogState.isOpen}>
      <Button
        onClick={openAsNew}
        className="m-4 w-2/6 bg-white text-black hover:bg-white/80"
      >
        <CirclePlus className="mr-2 h-4 w-4" /> Tarea
      </Button>
      {dialogState.mode === 'new' && (
        <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Agregar Tarea</DialogTitle>
            <DialogDescription>
              Completa los campos para añadir una nueva tarea a tu lista.
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            typeAction="create"
            onSubmit={newTask}
            formTask={formTask}
            categoryId={categoryId}
          />
        </DialogContent>
      )}
      {dialogState.mode === 'update' && (
        <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Actualizar Tarea</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la tarea y guarda los cambios.
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            typeAction="update"
            onSubmit={updateTask}
            formTask={formTask}
            categoryId={categoryId}
            dataFormUpdate={dataFormUpdate}
          />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default DialogNewTask;
