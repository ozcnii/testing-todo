import { render, screen } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import { Todo } from "../store/todo/todo-types";
import { TodoList } from "./todo-list";

jest.mock("react-redux");
const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");

describe("todo-list", () => {
  it("should show 'fount 0 todos'", () => {
    mockedUseSelector.mockReturnValue([]);

    render(<TodoList />);

    expect(screen.getByText(/fount 0 todos/i)).toBeInTheDocument();
    expect(screen.queryByTestId("todo-list")).not.toBeInTheDocument();
  });

  it("should show todos", () => {
    const todos: Todo[] = [
      { id: 10, isDone: true, text: "some-text" },
      { id: 11, isDone: false, text: "some-text2" },
    ];
    mockedUseSelector.mockReturnValue(todos);

    render(<TodoList />);

    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    expect(screen.queryByText(/fount 0 todos/i)).not.toBeInTheDocument();
    expect(screen.getAllByTestId("todo-item").length).toBe(todos.length);
  });
});
