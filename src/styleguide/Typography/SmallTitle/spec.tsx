import SmallTitle from "@src/styleguide/Typography/SmallTitle";
import { render, screen } from "@testing-library/react";

test("SmallTitle renders", () => {
  render(<SmallTitle>testing SmallTitle</SmallTitle>);
  const smalltitle = screen.getByText("testing SmallTitle");

  expect(smalltitle).toBeInTheDocument();
});
