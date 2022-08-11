import { render, screen } from "@testing-library/react";
import { AboutPage } from "./about";

describe("about-page", () => {
  it("about page render h1", () => {
    render(<AboutPage />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
