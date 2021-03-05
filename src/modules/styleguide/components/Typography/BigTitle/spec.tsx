import BigTitle from "@psi/styleguide/components/Typography/BigTitle";
import { render, screen } from "@testing-library/react";

test("BigTitle renders", () => {
  render(<BigTitle>testing BigTitle</BigTitle>);
  const bigtitle = screen.getByText("testing BigTitle");

  expect(bigtitle).toBeInTheDocument();
});
