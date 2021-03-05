import ViewportHigh from "@psi/styleguide/components/Layout/ViewportHigh";
import { render, screen } from "@testing-library/react";

test("ViewportHigh renders", () => {
  render(<ViewportHigh>testing ViewportHigh</ViewportHigh>);
  const row = screen.getByText("testing ViewportHigh") as HTMLInputElement;

  expect(row).toBeInTheDocument();
});
