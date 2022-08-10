import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { TodoItem } from "./todo-item";

export const TodoList: FC = () => {
  const todos = useAppSelector((state) => state.todo.list);

  if (!todos.length) {
    return (
      <>
        <h2>fount 0 todos :(</h2>
        maybe you want add one or more
      </>
    );
  }

  return (
    <ul data-testid="todo-list">
      {todos.map((todo) => (
        <li data-testid="todo-item" key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};
