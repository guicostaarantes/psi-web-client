import Button from "@src/styleguide/Button";
import { fireEvent, render, screen } from "@testing-library/react";

test("Button renders", () => {
  render(<Button>Testing button</Button>);
  const btn = screen.getByRole("button") as HTMLButtonElement;

  expect(btn).toBeInTheDocument();
});

test("Button clicks", () => {
  const mockFn = jest.fn();

  render(<Button onClick={mockFn}>Testing button</Button>);
  const btn = screen.getByRole("button") as HTMLButtonElement;

  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);
  expect(mockFn).toBeCalledTimes(1);
});

test("Button does not click if disabled", () => {
  const mockFn = jest.fn();

  render(
    <Button disabled onClick={mockFn}>
      Testing button
    </Button>
  );
  const btn = screen.getByRole("button") as HTMLButtonElement;

  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);
  expect(mockFn).toBeCalledTimes(0);
});

test("Button does not click if loading", () => {
  const mockFn = jest.fn();

  render(
    <Button loading onClick={mockFn}>
      Testing button
    </Button>
  );
  const btn = screen.getByRole("button") as HTMLButtonElement;

  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);
  expect(mockFn).toBeCalledTimes(0);
});
