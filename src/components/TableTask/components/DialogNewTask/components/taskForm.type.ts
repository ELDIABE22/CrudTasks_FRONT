import { UseFormReturn } from 'react-hook-form';
import { formTaskSchema } from '@/lib/zod';
import { z } from 'zod';
import { ITaskContext } from '@/context/TaskContext/taskContext.type';

export type Props = {
  typeAction: string;
  onSubmit:
    | ((
        values: z.TypeOf<typeof formTaskSchema>
      ) => Promise<JSX.Element | undefined>)
    | ((values: z.TypeOf<typeof formTaskSchema>) => Promise<void>);
  formTask: UseFormReturn<{
    id?: string;
    description: string;
    title: string;
    category: string;
    state?:
      | 'pending'
      | 'in progress'
      | 'review'
      | 'completed'
      | 'deleted'
      | undefined;
  }>;
  categoryId: string | undefined;
  dataFormUpdate?: ITaskContext | null;
};
