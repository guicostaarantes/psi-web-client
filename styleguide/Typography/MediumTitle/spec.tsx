import MediumTitle from "styleguide/Typography/MediumTitle";
import { render, screen } from "@testing-library/react";

test("MediumTitle renders", () => {
  render(<MediumTitle>testing MediumTitle</MediumTitle>);
  const mediumtitle = screen.getByText("testing MediumTitle");

  expect(mediumtitle).toBeInTheDocument();
});
