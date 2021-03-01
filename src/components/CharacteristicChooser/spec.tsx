import { Downgraded, useState } from "@hookstate/core";
import CharacteristicChooserComponent from "@src/components/CharacteristicChooser";
import { render, screen, waitFor } from "@testing-library/react";

const initialState: {
  name: string;
  type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
  selectedValues: string[];
  possibleValues: string[];
}[] = [
  {
    name: "has-consulted-before",
    type: "BOOLEAN",
    selectedValues: ["true"],
    possibleValues: ["true", "false"],
  },
  {
    name: "gender",
    type: "SINGLE",
    selectedValues: ["female"],
    possibleValues: ["male", "female", "non-binary"],
  },
  {
    name: "disabilities",
    type: "MULTIPLE",
    selectedValues: ["vision", " locomotion"],
    possibleValues: ["vision", "hearing", "locomotion"],
  },
];

const WrapperTestComponent = () => {
  const characteristics = useState<
    {
      name: string;
      type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
      selectedValues: string[];
      possibleValues: string[];
    }[]
  >(initialState).attach(Downgraded);

  const choices = useState<Record<string, unknown>>({}).attach(Downgraded);

  return (
    <CharacteristicChooserComponent
      characteristics={characteristics}
      choices={choices}
    />
  );
};
test("CharacteristicChooserComponent renders options", async () => {
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
