import { useTask } from '@/hooks/useTask';
import { useAuth } from '@/hooks/useAuth';
import { ICategoryContext } from '@/context/TaskContext/taskContext.type';
import { useEffect, useState } from 'react';

import CardCategory from '@/components/CardCategory/CardCategory';
import DialogCategory from '@/components/CardCategory/components/DialogNewCategory/DialogCategory';

const CategoryPage = () => {
  const [dataFormUpdate, setDataFormUpdate] = useState<ICategoryContext | null>(
    null
  );

  const {
    tasks,
    getTasks,
    getIdCategory,
    categorys,
    deleteCategory,
    dialogState,
    openAsNew,
    closeDialog,
    openAsUpdate,
  } = useTask();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getIdCategory(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <h1 className="text-4xl text-center text-white font-bold mb-10">
        CATEGORÍAS
      </h1>
      <div className="text-center">
        <DialogCategory
          dialogState={dialogState}
          openAsNew={openAsNew}
          closeDialog={closeDialog}
          dataFormUpdate={dataFormUpdate}
        />
      </div>
      <div className="flex gap-8 flex-wrap justify-center">
        {categorys.length > 0 ?
          categorys.map((cat) => (
            <CardCategory
              key={cat._id}
              category={cat}
              tasks={tasks}
              getTasks={getTasks}
              openAsUpdate={openAsUpdate}
              setDataFormUpdate={setDataFormUpdate}
              deleteCategory={deleteCategory}
            />
          )) : (
            <p className='text-white text-2xl font-semibold'>No tienes ninguna categoría.</p>
          )}
      </div>
    </>
  );
};

export default CategoryPage;
