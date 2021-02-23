import MainTitle from "styleguide/Typography/MainTitle";
import { render, screen } from "@testing-library/react";

test("MainTitle renders", () => {
  render(<MainTitle>testing MainTitle</MainTitle>);
  const maintitle = screen.getByText("testing MainTitle");

  expect(maintitle).toBeInTheDocument();
});
