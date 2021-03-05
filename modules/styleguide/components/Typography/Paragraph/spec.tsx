import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
import { render, screen } from "@testing-library/react";

test("Paragraph renders", () => {
  render(<Paragraph>testing Paragraph</Paragraph>);
  const paragraph = screen.getByText("testing Paragraph");

  expect(paragraph).toBeInTheDocument();
});
