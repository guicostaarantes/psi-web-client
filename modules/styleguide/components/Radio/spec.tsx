import { fireEvent, render, screen } from "@testing-library/react";

import Radio from "@psi/styleguide/components/Radio";

test("Radio renders", () => {
  render(
    <>
      <Radio name="test-radio" value="option1" label="testing Radio 1" />
      <Radio name="test-radio" value="option2" label="testing Radio 2" />
    </>,
  );
  const radio1 = screen.getByLabelText("testing Radio 1") as HTMLInputElement;
  const radioLabel1 = screen.getByText("testing Radio 1") as HTMLDivElement;
  const radio2 = screen.getByLabelText("testing Radio 2") as HTMLInputElement;
  const radioLabel2 = screen.getByText("testing Radio 2") as HTMLDivElement;

  expect(radio1).toBeInTheDocument();
  expect(radioLabel1).toBeInTheDocument();
  expect(radio2).toBeInTheDocument();
  expect(radioLabel2).toBeInTheDocument();
});

test("Radio starts as false and changes to true if click in input", () => {
  render(
    <>
      <Radio
        name="test-radio"
        value="option1"
        label="testing Radio 1"
        defaultChecked
      />
      <Radio name="test-radio" value="option2" label="testing Radio 2" />
    </>,
  );

  const radio1 = screen.getByLabelText("testing Radio 1") as HTMLInputElement;
  const radio2 = screen.getByLabelText("testing Radio 2") as HTMLInputElement;

  expect(radio1.checked).toBe(true);
  expect(radio2.checked).toBe(false);

  fireEvent.click(radio2);
  expect(radio1.checked).toBe(false);
  expect(radio2.checked).toBe(true);
});

test("Radio starts as false and changes to true if click in label", () => {
  render(
    <>
      <Radio
        name="test-radio"
        value="option1"
        label="testing Radio 1"
        defaultChecked
      />
      <Radio name="test-radio" value="option2" label="testing Radio 2" />
    </>,
  );

  const radio1 = screen.getByLabelText("testing Radio 1") as HTMLInputElement;
  const radio2 = screen.getByLabelText("testing Radio 2") as HTMLInputElement;
  const radioLabel2 = screen.getByText("testing Radio 2") as HTMLDivElement;

  expect(radio1.checked).toBe(true);
  expect(radio2.checked).toBe(false);

  fireEvent.click(radioLabel2);
  expect(radio1.checked).toBe(false);
  expect(radio2.checked).toBe(true);
});

test("Radio does not change state if click when disabled", () => {
  render(
    <>
      <Radio
        name="test-radio"
        value="option1"
        label="testing Radio 1"
        defaultChecked
      />
      <Radio
        name="test-radio"
        value="option2"
        label="testing Radio 2"
        disabled
      />
    </>,
  );

  const radio1 = screen.getByLabelText("testing Radio 1") as HTMLInputElement;
  const radio2 = screen.getByLabelText("testing Radio 2") as HTMLInputElement;

  expect(radio1.checked).toBe(true);
  expect(radio2.checked).toBe(false);

  radio1.click(); // not using fireEvent.click(checkbox) since it does not seem to work as expected for disabled inputs
  expect(radio1.checked).toBe(true);
  expect(radio2.checked).toBe(false);
});
