import { fireEvent, render, screen } from "@testing-library/react";

import TextArea from "@psi/styleguide/components/TextArea";

test("TextArea renders", () => {
  render(<TextArea name="test" label="testing textarea" />);
  const textarea = screen.getByLabelText(
    "testing textarea",
  ) as HTMLTextAreaElement;

  expect(textarea).toBeInTheDocument();
});

test("TextArea changes value", () => {
  render(<TextArea name="test" label="testing textarea" />);
  const textarea = screen.getByLabelText(
    "testing textarea",
  ) as HTMLTextAreaElement;

  fireEvent.change(textarea, { target: { value: "testing" } });
  expect(textarea.value).toBe("testing");
});
