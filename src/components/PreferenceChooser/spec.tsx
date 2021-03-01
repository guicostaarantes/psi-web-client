import { Downgraded, useState } from "@hookstate/core";
import PreferenceChooserComponent from "@src/components/PreferenceChooser";
import { render, screen, waitFor } from "@testing-library/react";

const initialState: {
  name: string;
  type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
  possibleValues: string[];
}[] = [
  {
    name: "has-consulted-before",
    type: "BOOLEAN",
    possibleValues: ["true", "false"],
  },
  {
    name: "gender",
    type: "SINGLE",
    possibleValues: ["male", "female", "non-binary"],
  },
  {
    name: "disabilities",
    type: "MULTIPLE",
    possibleValues: ["vision", "hearing", "locomotion"],
  },
];

const WrapperTestComponent = () => {
  const preferences = useState<
    {
      name: string;
      type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
      possibleValues: string[];
    }[]
  >(initialState).attach(Downgraded);

  const weights = useState<Record<string, Record<string, number>>>({}).attach(
    Downgraded,
  );

  return (
    <PreferenceChooserComponent preferences={preferences} weights={weights} />
  );
};
test("PreferenceChooserComponent renders options", async () => {
  render(<WrapperTestComponent />);

  await waitFor(() => {
    const optionTitle1 = screen.getByText(
      "has-consulted-before",
    ) as HTMLDivElement;
    const optionTitle2 = screen.getByText("gender") as HTMLDivElement;
    const optionTitle3 = screen.getByText("disabilities") as HTMLDivElement;

    expect(optionTitle1).toBeInTheDocument();
    expect(optionTitle2).toBeInTheDocument();
    expect(optionTitle3).toBeInTheDocument();
  });
});

// TODO: test if values from server are being reflected on the fields
