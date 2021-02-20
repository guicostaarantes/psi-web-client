import Container from "styleguide/Layout/Container";
import { render, screen } from "@testing-library/react";

test("testing container", () => {
  render(<Container>testing container</Container>);
  const container = screen.getByText("testing container") as HTMLInputElement;

  expect(container).toBeInTheDocument();
});
