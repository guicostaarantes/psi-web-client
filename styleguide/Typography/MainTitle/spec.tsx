import MainTitle from "styleguide/Typography/MainTitle";
import { render, screen } from "@testing-library/react";

test("testing main title", () => {
  render(<MainTitle>testing main title</MainTitle>);
  const maintitle = screen.getByText("testing main title");

  expect(maintitle).toBeInTheDocument();
});
