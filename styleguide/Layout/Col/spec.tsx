import Col from "styleguide/Layout/Col";
import { render, screen } from "@testing-library/react";

test("Col renders", () => {
  render(<Col>testing Col</Col>);
  const col = screen.getByText("testing Col") as HTMLInputElement;

  expect(col).toBeInTheDocument();
});
