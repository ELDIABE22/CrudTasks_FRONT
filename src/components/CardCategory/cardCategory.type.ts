import {
  ICategoryContext,
  ITaskContext,
} from '@/context/TaskContext/taskContext.type';

export type Props = {
  category: ICategoryContext;
  tasks: ITaskContext[] | [];
  getTasks: () => Promise<JSX.Element | undefined>;
  openAsUpdate: () => void;
  setDataFormUpdate: React.Dispatch<
    React.SetStateAction<ICategoryContext | null>
  >;
  deleteCategory: (id: string) => void;
};
