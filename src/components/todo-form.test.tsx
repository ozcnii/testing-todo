import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wrapper } from "../utils/test-utils";
import { TodoForm } from "./todo-form";

describe("todo-form", () => {
  it("type data in input", () => {
    render(Wrapper(<TodoForm />));
    const text = "hello, world";

    userEvent.type(screen.getByPlaceholderText(/enter todo text/i), text);

    const inputValue =
      screen.getByPlaceholderText<HTMLInputElement>(/enter todo/i).value;

    expect(inputValue).toBe(text);
  });

  it("after form submit input should be clean", () => {
    render(Wrapper(<TodoForm />));
    const text = "some-text";

    userEvent.type(screen.getByPlaceholderText(/enter todo text/i), text);
    userEvent.click(screen.getByRole("button", { name: /add/i }));

    const inputValue =
      screen.getByPlaceholderText<HTMLInputElement>(/enter todo/i).value;

    expect(inputValue).toBe("");
  });

  it("button should disabled if input clean", () => {
    render(Wrapper(<TodoForm />));
    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: /add/i,
    });
    expect(button.disabled).toBeTruthy();
  });

  it("button should enabled if input not clean", () => {
    render(Wrapper(<TodoForm />));
    const text = "some-text";

    userEvent.type(screen.getByPlaceholderText(/enter todo text/i), text);
    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: /add/i,
    });

    expect(button.disabled).toBeFalsy();
  });
});
