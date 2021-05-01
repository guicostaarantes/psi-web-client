import { render, screen } from "@testing-library/react";

import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";

test("MediumTitle renders", () => {
  render(<MediumTitle>testing MediumTitle</MediumTitle>);
  const mediumtitle = screen.getByText("testing MediumTitle");

  expect(mediumtitle).toBeInTheDocument();
});
