import Button from "styleguide/Button";
import { fireEvent, render, screen } from "@testing-library/react";

test("testing button", () => {
  const mockFn = jest.fn();

  render(<Button onClick={mockFn}>Testing button</Button>);
  const btn = screen.getByRole("button") as HTMLButtonElement;

  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);
  expect(mockFn).toBeCalledTimes(1);
});
