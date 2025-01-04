import { ITaskContext } from '@/context/TaskContext/taskContext.type';
import { ColumnDef } from '@tanstack/react-table';

export type ColumsTask = ITaskContext;

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  categoryId: string | undefined;
  dataFormUpdate: ITaskContext | null;
}
