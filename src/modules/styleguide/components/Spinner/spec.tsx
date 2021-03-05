import Spinner from "@src/modules/styleguide/components/Spinner";
import { render, screen } from "@testing-library/react";

test("Spinner renders", () => {
  render(<Spinner size="1rem" />);
  const spinner = screen.getByRole("status");

  expect(spinner).toBeInTheDocument();
});
