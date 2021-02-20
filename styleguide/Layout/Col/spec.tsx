import Col from "styleguide/Layout/Col";
import { render, screen } from "@testing-library/react";

test("testing col", () => {
  render(<Col>testing col</Col>);
  const col = screen.getByText("testing col") as HTMLInputElement;

  expect(col).toBeInTheDocument();
});
