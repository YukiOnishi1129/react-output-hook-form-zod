import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTodoEditTemplate } from "./useTodoEditTemplate";
import { useTodoContext } from "../../../hooks/useTodoContext";
import { BaseLayout } from "../../organisms";
import { CommonButton, TextArea, InputForm } from "../../atoms";
import styles from "./style.module.css";

const schema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です。")
    .max(10, "10文字以内で入力してください。"),
  content: z.string(),
});

export const TodoEditTemplate = () => {
  const { originTodoList, updateTodo } = useTodoContext();

  const { todo, handleUpdateTodo } = useTodoEditTemplate({
    originTodoList,
    updateTodo,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: todo?.title, content: todo?.content },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof schema>) => {
      handleUpdateTodo({
        title: values.title,
        content: values.content,
      });
    },
    [handleUpdateTodo]
  );

  return (
    <BaseLayout title={"TodoEdit"}>
      {!!todo && (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.area}>
            <Controller
              name="title"
              render={({ field }) => (
                <InputForm placeholder={"Title"} {...field} />
              )}
              control={control}
            />
            {errors.title && (
              <span style={{ color: "red" }}>{errors.title?.message}</span>
            )}
          </div>
          <div className={styles.area}>
            <Controller
              name="content"
              render={({ field }) => (
                <TextArea placeholder={"Content"} {...field} />
              )}
              control={control}
            />
            {errors.content && (
              <span style={{ color: "red" }}>{errors.content?.message}</span>
            )}
          </div>
          <div className={styles.area}>
            <CommonButton type="submit">{"Edit Todo"}</CommonButton>
          </div>
        </form>
      )}
    </BaseLayout>
  );
};
