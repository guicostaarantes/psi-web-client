import Container from "@src/styleguide/Layout/Container";
import { render, screen } from "@testing-library/react";

test("Container renders", () => {
  render(<Container>testing Container</Container>);
  const container = screen.getByText("testing Container") as HTMLInputElement;

  expect(container).toBeInTheDocument();
});
