import { render, screen } from "@testing-library/react";

import ToastContainer from "@psi/styleguide/components/Toast";
import { ToastProps } from "@psi/styleguide/hooks/useToast";

let mockToasts: ToastProps[];

jest.mock("@psi/styleguide/hooks/useToast", () => {
  return jest.fn(() => ({
    toasts: mockToasts,
  }));
});

test("No toasts", () => {
  mockToasts = [];

  render(<ToastContainer />);
  const toasts = screen.queryAllByRole("alert");

  expect(toasts.length).toBe(0);
});

test("One toast", () => {
  mockToasts = [
    {
      header: "Test",
      id: "123",
      message: "This is a test",
      state: "in",
    },
  ];

  render(<ToastContainer />);
  const toasts = screen.queryAllByRole("alert");

  expect(toasts.length).toBe(1);
});

test("Two toasts", () => {
  mockToasts = [
    {
      header: "Test",
      id: "123",
      message: "This is a test",
      state: "in",
    },
    {
      header: "Test 2",
      id: "456",
      message: "This is a test 2",
      state: "in",
    },
  ];

  render(<ToastContainer />);
  const toasts = screen.queryAllByRole("alert");

  expect(toasts.length).toBe(2);
});
