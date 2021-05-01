import { render, screen } from "@testing-library/react";

import Col from "@psi/styleguide/components/Layout/Col";

test("Col renders", () => {
  render(<Col>testing Col</Col>);
  const col = screen.getByText("testing Col") as HTMLInputElement;

  expect(col).toBeInTheDocument();
});
