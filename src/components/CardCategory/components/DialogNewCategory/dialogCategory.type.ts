import {
  ICategoryContext,
  IDialogStateContext,
} from '@/context/TaskContext/taskContext.type';

export type Props = {
  dialogState: IDialogStateContext;
  openAsNew: () => void;
  closeDialog: () => void;
  dataFormUpdate: ICategoryContext | null;
};
