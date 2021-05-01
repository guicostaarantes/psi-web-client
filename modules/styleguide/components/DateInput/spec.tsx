import { fireEvent, render, screen } from "@testing-library/react";

import DateInput from "@psi/styleguide/components/DateInput";

test("DateInput renders", () => {
  render(<DateInput format="DD/MM/YYYY" name="test" label="testing input" />);
  const input = screen.getByLabelText("testing input") as HTMLInputElement;

  expect(input).toBeInTheDocument();
});

test("DateInput changes value", () => {
  render(<DateInput format="DD/MM/YYYY" name="test" label="testing input" />);
  const input = screen.getByLabelText("testing input") as HTMLInputElement;

  fireEvent.change(input, { target: { value: "31121999" } });
  expect(input.value).toBe("31/12/1999");
});
