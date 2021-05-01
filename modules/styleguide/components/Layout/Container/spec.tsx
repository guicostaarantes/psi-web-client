import { render, screen } from "@testing-library/react";

import Container from "@psi/styleguide/components/Layout/Container";

test("Container renders", () => {
  render(<Container>testing Container</Container>);
  const container = screen.getByText("testing Container") as HTMLInputElement;

  expect(container).toBeInTheDocument();
});
