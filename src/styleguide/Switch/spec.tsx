import Switch from "@src/styleguide/Switch";
import { fireEvent, render, screen } from "@testing-library/react";

test("Switch renders", () => {
  render(<Switch name="test" label="testing Switch" />);
  const checkbox = screen.getByLabelText("testing Switch") as HTMLInputElement;
  const checkboxLabel = screen.getByText("testing Switch") as HTMLDivElement;

  expect(checkbox).toBeInTheDocument();
  expect(checkboxLabel).toBeInTheDocument();
});

test("Switch starts as false and changes to true if click in input", () => {
  render(<Switch name="test" label="testing Switch" />);
  const checkbox = screen.getByLabelText("testing Switch") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
});

test("Switch starts as false and changes to true if click in label", () => {
  render(<Switch name="test" label="testing Switch" />);
  const checkbox = screen.getByLabelText("testing Switch") as HTMLInputElement;
  const checkboxLabel = screen.getByText("testing Switch") as HTMLDivElement;
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkboxLabel);
  expect(checkbox.checked).toBe(true);
});

test("Switch starts as true and changes to false if click", () => {
  render(<Switch name="test" label="testing Switch" defaultChecked />);
  const checkbox = screen.getByLabelText("testing Switch") as HTMLInputElement;
  expect(checkbox.checked).toBe(true);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(false);
});

test("Switch starts as false and changes to true if click in input", () => {
  render(<Switch name="test" label="testing Switch" />);
  const checkbox = screen.getByLabelText("testing Switch") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
});

test("Switch does not change state if click when disabled", () => {
  render(<Switch name="test" label="testing Switch" disabled />);
  const checkbox = screen.getByLabelText("testing Switch") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);

  checkbox.click(); // not using fireEvent.click(checkbox) since it does not seem to work as expected for disabled inputs
  expect(checkbox.checked).toBe(false);
});

test("Switch does not change state if click when disabled and defaultChecked", () => {
  render(<Switch name="test" label="testing Switch" defaultChecked disabled />);
  const checkbox = screen.getByLabelText("testing Switch") as HTMLInputElement;
  expect(checkbox.checked).toBe(true);

  checkbox.click(); // not using fireEvent.click(checkbox) since it does not seem to work as expected for disabled inputs
  expect(checkbox.checked).toBe(true);
});
