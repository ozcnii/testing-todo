import { render, screen } from "@testing-library/react";
import { Wrapper } from "../utils/test-utils";
import { AboutPage } from "./about";

describe("about-page", () => {
  it("about page render h1", () => {
    render(Wrapper(<AboutPage />));
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
