import Paragraph from "styleguide/Typography/Paragraph";
import { render, screen } from "@testing-library/react";

test("testing paragraph", () => {
  render(<Paragraph>testing paragraph</Paragraph>);
  const paragraph = screen.getByText("testing paragraph");

  expect(paragraph).toBeInTheDocument();
});
