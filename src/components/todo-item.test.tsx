import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Todo } from "../store/todo/todo-types";
import { TodoItem } from "./todo-item";
import * as reduxHooks from "react-redux";
import * as actions from "../store/todo/todo-slice";

jest.mock("react-redux");
const mockedUseDispatch = jest.spyOn(reduxHooks, "useDispatch");

describe("todo-item", () => {
  it("should render todo", () => {
    const todo: Todo = { id: 10, isDone: false, text: "some-text" };
    render(<TodoItem todo={todo} />);

    expect(screen.getByTestId("todo-item-text").textContent).toBe(todo.text);
    expect(
      screen.getByTestId<HTMLInputElement>("todo-item-checkbox").checked
    ).toBe(todo.isDone);
  });

  it("should toogle done", () => {
    const todo: Todo = { id: 10, isDone: true, text: "some-text" };

    const mockedToggleTodoAcion = jest.spyOn(actions, "toggleDone");
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dispatch);

    render(<TodoItem todo={todo} />);

    userEvent.click(screen.getByTestId("todo-item-checkbox"));

    expect(mockedToggleTodoAcion).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it("should remove done", () => {
    const todo: Todo = { id: 10, isDone: true, text: "some-text" };

    const mockedRemoveTodoAcion = jest.spyOn(actions, "removeTodo");
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dispatch);

    render(<TodoItem todo={todo} />);

    userEvent.click(screen.getByTestId("todo-item-remove"));

    expect(mockedRemoveTodoAcion).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
