import Row from "styleguide/Layout/Row";
import { render, screen } from "@testing-library/react";

test("testing row", () => {
  render(<Row>testing row</Row>);
  const row = screen.getByText("testing row") as HTMLInputElement;

  expect(row).toBeInTheDocument();
});
