import SmallTitle from "styleguide/Typography/SmallTitle";
import { render, screen } from "@testing-library/react";

test("testing small title", () => {
  render(<SmallTitle>testing small title</SmallTitle>);
  const smalltitle = screen.getByText("testing small title");

  expect(smalltitle).toBeInTheDocument();
});
