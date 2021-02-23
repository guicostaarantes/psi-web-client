import Card from "styleguide/Card";
import { render, screen } from "@testing-library/react";

test("Card renders", () => {
  render(<Card>testing Card</Card>);
  const card = screen.getByText("testing Card") as HTMLDivElement;

  expect(card).toBeInTheDocument();
});
