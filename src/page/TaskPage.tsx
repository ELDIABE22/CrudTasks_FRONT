import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTask } from '@/hooks/useTask';
import { TableTask } from '@/components/TableTask/TableTask';
import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ColumsTask } from '@/components/TableTask/tableTask.type';
import { Params, useParams } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronRight,
  CircleCheck,
  Clock,
  Loader,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@radix-ui/react-dropdown-menu';
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
import { ITaskContext } from '@/context/TaskContext/taskContext.type';
import { Badge } from '@/components/ui/badge';

interface IParams extends Readonly<Params<string>> {
  categoryId: string;
  categoryName: string;
}

const TaskPage = () => {
  const [dataFormUpdate, setDataFormUpdate] = useState<ITaskContext | null>(
    null
  );
  const { user } = useAuth();
  const { getIdTask, tasks, deleteTask, openAsUpdate, updateStateTask } =
    useTask();

  const { categoryId } = useParams<IParams>();

  const columns: ColumnDef<ColumsTask>[] = [
    {
      accessorKey: 'title',
      header: 'Título',
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
    },
    {
      accessorKey: 'state',
      header: 'Estado',
      cell: ({ cell }) => {
        return (
          <>
            {cell.row.original.state === 'pending' && (
              <Badge className="bg-orange-500">Pendiente</Badge>
            )}
            {cell.row.original.state === 'in progress' && (
              <Badge className="bg-blue-500">En curso</Badge>
            )}
            {cell.row.original.state === 'completed' && (
              <Badge className="bg-green-500">Completado</Badge>
            )}
          </>
        );
      },
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ cell }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => {
                  openAsUpdate();
                  setDataFormUpdate(cell.row.original);
                }}
                className="cursor-pointer"
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer text-sm text-black py-[6px] px-2 flex items-center justify-between">
                  Cambiar estado
                  <ChevronRight className="mr-2 h-4 w-4" />
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-white text-black rounded">
                    {cell.row.original.state !== 'pending' && (
                      <DropdownMenuItem
                        onClick={() =>
                          updateStateTask(
                            cell.row.original._id,
                            categoryId,
                            'pending'
                          )
                        }
                        className="cursor-pointer"
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Pendiente
                      </DropdownMenuItem>
                    )}

                    {cell.row.original.state !== 'in progress' && (
                      <DropdownMenuItem
                        onClick={() =>
                          updateStateTask(
                            cell.row.original._id,
                            categoryId,
                            'in progress'
                          )
                        }
                        className="cursor-pointer"
                      >
                        <Loader className="mr-2 h-4 w-4" />
                        En curso
                      </DropdownMenuItem>
                    )}

                    {cell.row.original.state !== 'completed' && (
                      <DropdownMenuItem
                        onClick={() =>
                          updateStateTask(
                            cell.row.original._id,
                            categoryId,
                            'completed'
                          )
                        }
                        className="cursor-pointer"
                      >
                        <CircleCheck className="mr-2 h-4 w-4" />
                        Completado
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="cursor-pointer px-2 py-[6px] h-[31.99px] bg-white text-black hover:bg-white font-normal w-full justify-start">
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-slate-900">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                      ¿Estás seguro de eliminar esta tarea?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción es irreversible y no podrás recuperar la tarea
                      eliminada.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() =>
                        deleteTask(cell.row.original._id, categoryId)
                      }
                    >
                      Confirmar
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    if (user && categoryId) {
      getIdTask(categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <h1 className="text-4xl text-center text-white font-bold">TAREAS</h1>

      <div className="container mx-auto px-0 pt-10 md:py-10">
        <TableTask
          columns={columns}
          data={tasks}
          categoryId={categoryId}
          dataFormUpdate={dataFormUpdate}
        />
      </div>
    </>
  );
};

export default TaskPage;
