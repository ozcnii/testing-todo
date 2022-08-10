import { FC, memo } from "react";
import { useAppDispatch } from "../hooks/redux";
import { removeTodo, toggleDone } from "../store/todo/todo-slice";
import { Todo } from "../store/todo/todo-types";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: FC<TodoItemProps> = memo(({ todo }) => {
  const dispatch = useAppDispatch();

  const onChange = () => {
    dispatch(toggleDone(todo));
  };

  const onRemove = () => {
    dispatch(removeTodo(todo));
  };

  return (
    <>
      <input
        data-testid="todo-item-checkbox"
        type="checkbox"
        checked={todo.isDone}
        onChange={onChange}
      />
      <span
        data-testid="todo-item-text"
        style={{
          textDecoration: todo.isDone ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
      <button data-testid="todo-item-remove" onClick={onRemove}>
        ✖
      </button>
    </>
  );
});
