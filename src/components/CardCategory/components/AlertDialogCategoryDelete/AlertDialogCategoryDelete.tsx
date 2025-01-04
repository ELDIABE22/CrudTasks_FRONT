import { Props } from './alertDialogCategoryDelete.type';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const AlertDialogCategoryDelete = ({ id, deleteCategory }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="hover:text-red-500">Eliminar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            ¿Estás seguro de eliminar esta categoría?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es irreversible y puede eliminar todas las tareas
            asociadas a esta categoría!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => deleteCategory(id)}>
            Confirmar
          </AlertDialogAction>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogCategoryDelete;
