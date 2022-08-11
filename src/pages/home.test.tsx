import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wrapper } from "../utils/test-utils";
import { HomePage } from "./home";

describe("home-page", () => {
  it("home page render h1", () => {
    render(Wrapper(<HomePage />));
    expect(screen.getByTestId("home-heading")).toBeInTheDocument();
  });

  it("todo added", () => {
    render(Wrapper(<HomePage />));

    const text = "some-text";

    userEvent.type(screen.getByPlaceholderText(/enter todo text/i), text);
    userEvent.click(screen.getByText(/add/i));

    expect(
      screen.getAllByTestId("todo-item-text").map((e) => e.textContent)
    ).toContain(text);
  });

  it("todo not added if input clean", () => {
    render(Wrapper(<HomePage />));

    const text = "some-text";

    userEvent.click(screen.getByText(/add/i));

    expect(
      screen.getAllByTestId("todo-item-text").map((e) => e.textContent)
    ).not.toContain(text);
  });

  it("chekbox toggled", () => {
    render(Wrapper(<HomePage />));

    const text = "some-text";

    userEvent.type(screen.getByPlaceholderText(/enter todo text/i), text);
    userEvent.click(screen.getByText(/add/i));

    const items = screen.getAllByTestId("todo-item");

    const chekbox = within(items.at(-1)!).getByRole<HTMLInputElement>(
      "checkbox"
    );

    expect(chekbox.checked).toBeFalsy();

    userEvent.click(chekbox);

    expect(chekbox.checked).toBeTruthy();
  });

  it("todo removed", () => {
    render(Wrapper(<HomePage />));

    const text = "some-text";

    userEvent.type(screen.getByPlaceholderText(/enter todo text/i), text);
    userEvent.click(screen.getByText(/add/i));

    const items = screen.getAllByTestId("todo-item");
    const removeButton = within(items.at(-1)!).getByTestId("todo-item-remove");

    userEvent.click(removeButton);

    expect(items).not.toContain(text);
  });
});
