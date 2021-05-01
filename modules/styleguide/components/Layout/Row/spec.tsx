import { render, screen } from "@testing-library/react";

import Row from "@psi/styleguide/components/Layout/Row";

test("Row renders", () => {
  render(<Row>testing Row</Row>);
  const row = screen.getByText("testing Row") as HTMLInputElement;

  expect(row).toBeInTheDocument();
});
