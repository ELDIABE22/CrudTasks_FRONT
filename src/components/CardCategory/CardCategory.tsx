import { Props } from './cardCategory.type';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import AlertDialogCategoryDelete from './components/AlertDialogCategoryDelete/AlertDialogCategoryDelete';

const CardCategory = ({
  category,
  tasks,
  getTasks,
  openAsUpdate,
  setDataFormUpdate,
  deleteCategory,
}: Props) => {
  const navigate = useNavigate();

  // Filtra las tareas que pertenecen a la categoría actual
  const tasksForCategory = tasks.filter(
    (task) => task.category === category._id && task.state !== 'deleted'
  );

  const handleCardClick = () => {
    navigate(`/categorys/${category.name}/${category._id}/tasks`);
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="bg-slate-900 text-white sm:min-w-80 min-h-40 min-w-full cursor-pointer flex-col justify-between">
      <CardHeader className="flex-grow">
        <CardTitle>{category.name}</CardTitle>
        <CardDescription className="truncate">
          {category.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        {tasksForCategory.length > 0 ? (
          <>
            <p className="py-2 px-2">
              <span className="mr-1">{tasksForCategory.length}</span>
              {tasksForCategory.length === 1 ? 'tarea' : 'tareas'}
            </p>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCardClick}
              className="hover:bg-white/70"
            >
              <ChevronRight className="h-4 w-4 text-black" />
            </Button>
          </>
        ) : (
          <>
            <p className="py-2 px-2">No tienes tareas asignadas</p>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCardClick}
              className="hover:bg-white/70"
            >
              <ChevronRight className="h-4 w-4 text-black" />
            </Button>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="hover:text-blue-500"
          onClick={() => {
            openAsUpdate();
            setDataFormUpdate(category);
          }}
        >
          Editar
        </Button>
        <AlertDialogCategoryDelete
          id={category._id}
          deleteCategory={deleteCategory}
        />
      </CardFooter>
    </Card>
  );
};

export default CardCategory;
