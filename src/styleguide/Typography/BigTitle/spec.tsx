import BigTitle from "@src/styleguide/Typography/BigTitle";
import { render, screen } from "@testing-library/react";

test("BigTitle renders", () => {
  render(<BigTitle>testing BigTitle</BigTitle>);
  const bigtitle = screen.getByText("testing BigTitle");

  expect(bigtitle).toBeInTheDocument();
});