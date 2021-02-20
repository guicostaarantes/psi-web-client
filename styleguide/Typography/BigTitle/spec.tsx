import BigTitle from "styleguide/Typography/BigTitle";
import { render, screen } from "@testing-library/react";

test("testing big title", () => {
  render(<BigTitle>testing big title</BigTitle>);
  const bigtitle = screen.getByText("testing big title");

  expect(bigtitle).toBeInTheDocument();
});
