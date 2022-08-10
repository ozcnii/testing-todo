import { FC, useState, FormEvent } from "react";
import { useAppDispatch } from "../hooks/redux";
import { addTodo } from "../store/todo/todo-slice";

export const TodoForm: FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = value.trim();

    if (!text) return;

    dispatch(addTodo({ text }));
    setValue("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Enter todo text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button disabled={!value}>add</button>
    </form>
  );
};
