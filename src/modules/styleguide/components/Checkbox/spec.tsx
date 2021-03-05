import Checkbox from "@src/modules/styleguide/components/Checkbox";
import { fireEvent, render, screen } from "@testing-library/react";

test("Checkbox renders", () => {
  render(<Checkbox name="test" label="testing Checkbox" />);
  const checkbox = screen.getByLabelText(
    "testing Checkbox",
  ) as HTMLInputElement;
  const checkboxLabel = screen.getByText("testing Checkbox") as HTMLDivElement;

  expect(checkbox).toBeInTheDocument();
  expect(checkboxLabel).toBeInTheDocument();
});

test("Checkbox starts as false and changes to true if click in input", () => {
  render(<Checkbox name="test" label="testing Checkbox" />);
  const checkbox = screen.getByLabelText(
    "testing Checkbox",
  ) as HTMLInputElement;
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
});

test("Checkbox starts as false and changes to true if click in label", () => {
  render(<Checkbox name="test" label="testing Checkbox" />);
  const checkbox = screen.getByLabelText(
    "testing Checkbox",
  ) as HTMLInputElement;
  const checkboxLabel = screen.getByText("testing Checkbox") as HTMLDivElement;
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkboxLabel);
  expect(checkbox.checked).toBe(true);
});

test("Checkbox starts as true and changes to false if click", () => {
  render(<Checkbox name="test" label="testing Checkbox" defaultChecked />);
  const checkbox = screen.getByLabelText(
    "testing Checkbox",
  ) as HTMLInputElement;
  expect(checkbox.checked).toBe(true);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(false);
});

test("Checkbox starts as false and changes to true if click in input", () => {
  render(<Checkbox name="test" label="testing Checkbox" />);
  const checkbox = screen.getByLabelText(
    "testing Checkbox",
  ) as HTMLInputElement;
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
});

test("Checkbox does not change state if click when disabled", () => {
  render(<Checkbox name="test" label="testing Checkbox" disabled />);
  const checkbox = screen.getByLabelText(
    "testing Checkbox",
  ) as HTMLInputElement;
  expect(checkbox.checked).toBe(false);

  checkbox.click(); // not using fireEvent.click(checkbox) since it does not seem to work as expected for disabled inputs
  expect(checkbox.checked).toBe(false);
});

test("Checkbox does not change state if click when disabled and defaultChecked", () => {
  render(
    <Checkbox name="test" label="testing Checkbox" defaultChecked disabled />,
  );
  const checkbox = screen.getByLabelText(
    "testing Checkbox",
  ) as HTMLInputElement;
  expect(checkbox.checked).toBe(true);

  checkbox.click(); // not using fireEvent.click(checkbox) since it does not seem to work as expected for disabled inputs
  expect(checkbox.checked).toBe(true);
});
