import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "./todo-form";
import * as reduxHooks from "react-redux";
import * as actions from "../store/todo/todo-slice";

jest.mock("react-redux");
const mockedUseDispatch = jest.spyOn(reduxHooks, "useDispatch");

describe("todo-form", () => {
  it("type data in input", () => {
    render(<TodoForm />);
    const text = "hello, world";

    userEvent.type(screen.getByPlaceholderText(/enter todo text/i), text);

    const inputValue =
      screen.getByPlaceholderText<HTMLInputElement>(/enter todo/i).value;

    expect(inputValue).toBe(text);
  });

  it("after form submit input should be clean", () => {
    render(<TodoForm />);
    const text = "some-text";
    const fakeDispatch = jest.fn();
    const mockedAddTodoAction = jest.spyOn(actions, "addTodo");
    mockedUseDispatch.mockReturnValue(fakeDispatch);

    userEvent.type(screen.getByPlaceholderText(/enter todo text/i), text);
    userEvent.click(screen.getByRole("button", { name: /add/i }));

    const inputValue =
      screen.getByPlaceholderText<HTMLInputElement>(/enter todo/i).value;

    expect(inputValue).toBe("");
    expect(fakeDispatch).toHaveBeenCalledTimes(1);
    expect(mockedAddTodoAction).toHaveBeenCalledTimes(1);
  });

  it("button should disabled if input clean", () => {
    const fakeDispatch = jest.fn();
    const mockedAddTodoAction = jest.spyOn(actions, "addTodo");
    mockedUseDispatch.mockReturnValue(fakeDispatch);

    render(<TodoForm />);
    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: /add/i,
    });

    expect(button.disabled).toBeTruthy();

    userEvent.click(button);
    expect(fakeDispatch).toHaveBeenCalledTimes(0);
    expect(mockedAddTodoAction).toHaveBeenCalledTimes(0);
  });

  it("button should enabled if input not clean", () => {
    render(<TodoForm />);
    const text = "some-text";

    const fakeDispatch = jest.fn();
    const mockedAddTodoAction = jest.spyOn(actions, "addTodo");
    mockedUseDispatch.mockReturnValue(fakeDispatch);

    userEvent.type(screen.getByPlaceholderText(/enter todo text/i), text);
    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: /add/i,
    });

    expect(button.disabled).toBeFalsy();
    userEvent.click(button);
    expect(fakeDispatch).toHaveBeenCalledTimes(1);
    expect(mockedAddTodoAction).toHaveBeenCalledTimes(1);
  });
});
