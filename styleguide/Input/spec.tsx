import Input from "styleguide/Input";
import { fireEvent, render, screen } from "@testing-library/react";

test("testing input", () => {
  render(<Input name="test" label="testing input" />);
  const input = screen.getByLabelText("testing input") as HTMLInputElement;

  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "testing" } });
  expect(input.value).toBe("testing");
});
