import { render, screen } from "@testing-library/react";

import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

test("Paragraph renders", () => {
  render(<Paragraph>testing Paragraph</Paragraph>);
  const paragraph = screen.getByText("testing Paragraph");

  expect(paragraph).toBeInTheDocument();
});
