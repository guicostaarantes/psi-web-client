import React from "react";
import EmojiRadio from "@src/modules/styleguide/components/EmojiRadio";
import { fireEvent, render, screen } from "@testing-library/react";

export const TEST_OPTIONS = [
  {
    label: "dislike very much",
    src: "https://twemoji.maxcdn.com/2/svg/1f616.svg",
    value: -3,
  },
  {
    label: "dislike",
    src: "https://twemoji.maxcdn.com/2/svg/1f61f.svg",
    value: -1,
  },
  {
    label: "neutral",
    src: "https://twemoji.maxcdn.com/2/svg/1f610.svg",
    value: 0,
  },
  {
    label: "like",
    src: "https://twemoji.maxcdn.com/2/svg/1f600.svg",
    value: 1,
  },
  {
    label: "like very much",
    src: "https://twemoji.maxcdn.com/2/svg/1f929.svg",
    value: 3,
  },
];

const WrapperTestComponent = () => {
  const [value, setValue] = React.useState<number>(1);

  return (
    <>
      <EmojiRadio
        name="test-radio"
        checkedValue={value}
        onChange={(newValue) => setValue(newValue)}
        options={TEST_OPTIONS}
      />
      <span>value: {value}</span>
    </>
  );
};

test("EmojiRadio renders and changes when image clicked", () => {
  render(<WrapperTestComponent />);

  const radio1 = screen.getByLabelText("dislike very much") as HTMLInputElement;
  const radio2 = screen.getByLabelText("dislike") as HTMLInputElement;
  const radio3 = screen.getByLabelText("neutral") as HTMLInputElement;
  const radio4 = screen.getByLabelText("like") as HTMLInputElement;
  const radio5 = screen.getByLabelText("like very much") as HTMLInputElement;
  const radioImage1 = screen.getByAltText(
    "dislike very much",
  ) as HTMLImageElement;

  expect(radio1).not.toBeChecked();
  expect(radio2).not.toBeChecked();
  expect(radio3).not.toBeChecked();
  expect(radio4).toBeChecked();
  expect(radio5).not.toBeChecked();

  fireEvent.click(radioImage1);

  expect(radio1).toBeChecked();
  expect(radio2).not.toBeChecked();
  expect(radio3).not.toBeChecked();
  expect(radio4).not.toBeChecked();
  expect(radio5).not.toBeChecked();

  screen.getByText("value: -3");
});
