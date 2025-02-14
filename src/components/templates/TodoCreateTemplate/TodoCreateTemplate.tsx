import { Controller } from "react-hook-form";

import { useTodoContext } from "../../../hooks/useTodoContext";
import { BaseLayout } from "../../organisms";
import { CommonButton, InputForm, TextArea } from "../../atoms";
import { useTodoCreateTemplate } from "./useTodoCreateTemplate";
import styles from "./style.module.css";

export const TodoCreateTemplate = () => {
  const { addTodo } = useTodoContext();
  const { control, errors, handleAddSubmit } = useTodoCreateTemplate({
    addTodo,
  });

  return (
    <BaseLayout title={"Create Todo"}>
      <form className={styles.container} onSubmit={handleAddSubmit}>
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
