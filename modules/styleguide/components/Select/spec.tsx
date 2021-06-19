import { fireEvent, render, screen } from "@testing-library/react";

import Select from "@psi/styleguide/components/Select";

test("Select renders", () => {
  render(
    <Select
      name="test"
      label="testing select"
      options={[
        { value: 0, label: "zero" },
        { value: 1, label: "one" },
      ]}
    />,
  );
  const select = screen.getByLabelText("testing select") as HTMLSelectElement;

  expect(select).toBeInTheDocument();
});

test("Select changes value", () => {
  render(
    <Select
      name="test"
      label="testing select"
      options={[
        { value: 0, label: "zero" },
        { value: 1, label: "one" },
      ]}
    />,
  );
  const select = screen.getByLabelText("testing select") as HTMLSelectElement;

  fireEvent.change(select, { target: { value: 1 } });
  expect(select.value).toBe("1");
});
