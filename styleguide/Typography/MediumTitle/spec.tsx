import MediumTitle from "styleguide/Typography/MediumTitle";
import { render, screen } from "@testing-library/react";

test("testing medium title", () => {
  render(<MediumTitle>testing medium title</MediumTitle>);
  const mediumtitle = screen.getByText("testing medium title");

  expect(mediumtitle).toBeInTheDocument();
});
