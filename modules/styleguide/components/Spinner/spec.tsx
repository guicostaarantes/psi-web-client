import { render, screen } from "@testing-library/react";

import Spinner from "@psi/styleguide/components/Spinner";

test("Spinner renders", () => {
  render(<Spinner size="1rem" />);
  const spinner = screen.getByRole("status");

  expect(spinner).toBeInTheDocument();
});
