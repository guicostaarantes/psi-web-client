import Row from "styleguide/Layout/Row";
import { render, screen } from "@testing-library/react";

test("Row renders", () => {
  render(<Row>testing Row</Row>);
  const row = screen.getByText("testing Row") as HTMLInputElement;

  expect(row).toBeInTheDocument();
});
