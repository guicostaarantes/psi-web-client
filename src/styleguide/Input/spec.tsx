import Input from "@src/styleguide/Input";
import { fireEvent, render, screen } from "@testing-library/react";

test("Input renders", () => {
  render(<Input name="test" label="testing input" />);
  const input = screen.getByLabelText("testing input") as HTMLInputElement;

  expect(input).toBeInTheDocument();
});

test("Input changes value", () => {
  render(<Input name="test" label="testing input" />);
  const input = screen.getByLabelText("testing input") as HTMLInputElement;

  fireEvent.change(input, { target: { value: "testing" } });
  expect(input.value).toBe("testing");
});
