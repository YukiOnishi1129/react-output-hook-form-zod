import { useCallback } from "react";
import { useNavigate } from "react-router";
import { NAVIGATION_PATH } from "../../../constants/navigation";

type UseTodoCreateTemplateParams = {
  addTodo: (title: string, content: string) => void;
};

export const useTodoCreateTemplate = ({
  addTodo,
}: UseTodoCreateTemplateParams) => {
  const navigate = useNavigate();

  /**
   * Todo追加処理
   */
  const handleCreateTodo = useCallback(
    ({ title, content = "" }: { title: string; content?: string }) => {
      addTodo(title, content);
      navigate(NAVIGATION_PATH.TOP);
    },
    [addTodo, navigate]
  );

  return {
    handleCreateTodo,
  };
};
