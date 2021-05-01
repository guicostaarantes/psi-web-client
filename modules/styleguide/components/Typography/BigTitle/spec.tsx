import { render, screen } from "@testing-library/react";

import BigTitle from "@psi/styleguide/components/Typography/BigTitle";

test("BigTitle renders", () => {
  render(<BigTitle>testing BigTitle</BigTitle>);
  const bigtitle = screen.getByText("testing BigTitle");

  expect(bigtitle).toBeInTheDocument();
});
