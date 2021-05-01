import { render, screen } from "@testing-library/react";

import SmallTitle from "@psi/styleguide/components/Typography/SmallTitle";

test("SmallTitle renders", () => {
  render(<SmallTitle>testing SmallTitle</SmallTitle>);
  const smalltitle = screen.getByText("testing SmallTitle");

  expect(smalltitle).toBeInTheDocument();
});
