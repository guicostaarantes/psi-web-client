import ViewportHigh from "styleguide/Layout/ViewportHigh";
import { render, screen } from "@testing-library/react";

test("testing viewport high", () => {
  render(<ViewportHigh>testing viewport high</ViewportHigh>);
  const row = screen.getByText("testing viewport high") as HTMLInputElement;

  expect(row).toBeInTheDocument();
});
