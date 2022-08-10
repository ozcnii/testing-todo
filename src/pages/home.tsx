import { FC } from "react";
import { TodoForm } from "../components/todo-form";
import { TodoList } from "../components/todo-list";

export const HomePage: FC = () => {
  return (
    <>
      <h1>Home</h1>
      <p>Todos here</p>
      <TodoForm />
      <TodoList />
    </>
  );
};
