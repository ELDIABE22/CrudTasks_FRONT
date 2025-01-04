import { ITaskContext } from "@/context/TaskContext/taskContext.type";

export type Props = {
  categoryId: string | undefined;
  dataFormUpdate: ITaskContext | null;
};
