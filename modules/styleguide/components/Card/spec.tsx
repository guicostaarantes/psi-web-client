import { render, screen } from "@testing-library/react";

import Card from "@psi/styleguide/components/Card";

test("Card renders", () => {
  render(<Card>testing Card</Card>);
  const card = screen.getByText("testing Card") as HTMLDivElement;

  expect(card).toBeInTheDocument();
});
