import { render, screen } from "@testing-library/react";

import MainTitle from "@psi/styleguide/components/Typography/MainTitle";

test("MainTitle renders", () => {
  render(<MainTitle>testing MainTitle</MainTitle>);
  const maintitle = screen.getByText("testing MainTitle");

  expect(maintitle).toBeInTheDocument();
});
