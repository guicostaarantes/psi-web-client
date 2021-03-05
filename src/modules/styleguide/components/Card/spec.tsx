import Card from "@src/modules/styleguide/components/Card";
import { render, screen } from "@testing-library/react";

test("Card renders", () => {
  render(<Card>testing Card</Card>);
  const card = screen.getByText("testing Card") as HTMLDivElement;

  expect(card).toBeInTheDocument();
});
