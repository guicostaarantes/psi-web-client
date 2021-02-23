import Paragraph from "styleguide/Typography/Paragraph";
import { render, screen } from "@testing-library/react";

test("Paragraph renders", () => {
  render(<Paragraph>testing Paragraph</Paragraph>);
  const paragraph = screen.getByText("testing Paragraph");

  expect(paragraph).toBeInTheDocument();
});
