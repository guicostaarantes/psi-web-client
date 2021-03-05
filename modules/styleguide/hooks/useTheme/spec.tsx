/* eslint-disable @typescript-eslint/no-explicit-any */
import useTheme from "@psi/styleguide/hooks/useTheme";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("@psi/styleguide/constants/theme", () => ({
  DEFAULT_THEME: "theme1",
}));

jest.mock("@psi/styleguide/theme", () => ({
  __esModule: true,
  default: {
    theme1: { defaultColor: "green" },
    theme2: { defaultColor: "blue" },
  },
}));

const TestComponent = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div style={{ color: theme.defaultColor }}>
      the default color of the current theme is {theme.defaultColor}
      <button onClick={() => changeTheme("theme1" as any)}>
        switch to theme1
      </button>
      <button onClick={() => changeTheme("theme2" as any)}>
        switch to theme2
      </button>
    </div>
  );
};

test("should load default theme", async () => {
  render(<TestComponent />);

  await waitFor(() => {
    const div = screen.getByText(
      "the default color of the current theme is green",
    );
    expect(div).toBeInTheDocument();
    expect(div).toHaveStyle({ color: "green" });
  });
});

test("should load theme saved in localStorage", async () => {
  localStorage.setItem("theme", "theme2");

  render(<TestComponent />);

  await waitFor(() => {
    const div = screen.getByText(
      "the default color of the current theme is blue",
    );
    expect(div).toBeInTheDocument();
    expect(div).toHaveStyle({ color: "blue" });
  });
});

test("should change theme and reflect changes", async () => {
  render(<TestComponent />);

  const btn = screen.getByText("switch to theme2");
  expect(btn).toBeInTheDocument();
  fireEvent.click(btn);

  await waitFor(() => {
    const div = screen.getByText(
      "the default color of the current theme is blue",
    );
    expect(div).toBeInTheDocument();
    expect(div).toHaveStyle({ color: "blue" });
  });
});
