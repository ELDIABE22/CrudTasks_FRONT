import { ICategoryContext } from '@/context/TaskContext/taskContext.type';
import { formCategorySchema } from '@/lib/zod';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export type Props = {
  typeAction: string;
  onSubmit:
    | ((
        values: z.TypeOf<typeof formCategorySchema>
      ) => Promise<JSX.Element | undefined>)
    | ((values: z.TypeOf<typeof formCategorySchema>) => Promise<void>);
  onCancel: () => void;
  formCategory: UseFormReturn<{
    id?: string;
    name: string;
    description?: string | undefined;
}>
  dataFormUpdate?: ICategoryContext | null;
};
