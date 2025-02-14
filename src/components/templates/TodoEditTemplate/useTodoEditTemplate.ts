import { useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { NAVIGATION_PATH } from "../../../constants/navigation";
import { TodoType } from "../../../types/Todo";

type UseTodoEditTemplateParams = {
  originTodoList: Array<TodoType>;
  updateTodo: (id: number, title: string, content: string) => void;
};

export const useTodoEditTemplate = ({
  originTodoList,
  updateTodo,
}: UseTodoEditTemplateParams) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const todo = useMemo(
    () => originTodoList.find((todo) => String(todo.id) === id),
    [id, originTodoList]
  );

  /**
   * Todo更新処理
   */
  const handleUpdateTodo = useCallback(
    ({ title, content = "" }: { title: string; content?: string }) => {
      if (!todo) return;
      updateTodo(todo.id, title, content);
      navigate(NAVIGATION_PATH.TOP);
    },
    [navigate, updateTodo, todo]
  );

  return {
    todo,
    handleUpdateTodo,
  };
};
