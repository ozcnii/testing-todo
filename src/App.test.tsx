import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { WrapperWithHistory } from "./utils/test-utils";

it("about page should render on '/about route'", () => {
  render(
    WrapperWithHistory(<App />, { initialEntries: ["/about"], initialIndex: 0 })
  );
  const element = screen.getByText(/about.../i);
  expect(element).toBeInTheDocument();
});

it("navigation should work?", async () => {
  render(
    WrapperWithHistory(<App />, { initialEntries: ["/about"], initialIndex: 0 })
  );

  userEvent.click(screen.getByRole("link", { name: /home/i }));
  expect(screen.getByTestId("home-heading")).toBeInTheDocument();
});
