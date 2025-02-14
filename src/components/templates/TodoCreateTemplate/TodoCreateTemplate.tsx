import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTodoContext } from "../../../hooks/useTodoContext";
import { BaseLayout } from "../../organisms";
import { CommonButton, InputForm, TextArea } from "../../atoms";
import { useTodoCreateTemplate } from "./useTodoCreateTemplate";
import styles from "./style.module.css";

const schema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です。")
    .max(10, "10文字以内で入力してください。"),
  content: z.string().optional(),
});

export const TodoCreateTemplate = () => {
  const { addTodo } = useTodoContext();
  const { handleCreateTodo } = useTodoCreateTemplate({ addTodo });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", content: undefined },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof schema>) => {
      handleCreateTodo({
        title: values.title,
        content: values.content,
      });
    },
    [handleCreateTodo]
  );

  return (
    <BaseLayout title={"Create Todo"}>
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
          <CommonButton type="submit">{"Create Todo"}</CommonButton>
        </div>
      </form>
    </BaseLayout>
  );
};
