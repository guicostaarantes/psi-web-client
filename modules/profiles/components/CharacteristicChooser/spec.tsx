import { useState } from "@hookstate/core";
import CharacteristicChooserComponent from "@psi/profiles/components/CharacteristicChooser";
import { render, screen, waitFor } from "@testing-library/react";

const characteristics: {
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

const initialChoices: Record<string, unknown> = {};

const messages: Record<string, string> = {
  "char:has-consulted-before": "Você já se consultou com um psicólogo antes?",
  "char:has-consulted-before:true": "Sim",
  "char:has-consulted-before:false": "Não",
  "char:gender": "Com qual gênero você se identifica?",
  "char:gender:male": "Masculino",
  "char:gender:female": "Feminino",
  "char:gender:non-binary": "Não binário",
  "char:disabilities": "Você possui alguma dessas deficiências?",
  "char:disabilities:vision": "Visual",
  "char:disabilities:hearing": "Auditiva",
  "char:disabilities:locomotion": "Locomotora",
};

const WrapperTestComponent = () => {
  const choices = useState<Record<string, unknown>>(initialChoices);

  return (
    <CharacteristicChooserComponent
      characteristics={characteristics}
      choices={choices}
      messages={messages}
      prefix="char"
    />
  );
};
test("CharacteristicChooserComponent renders options", async () => {
  render(<WrapperTestComponent />);

  await waitFor(() => {
    const optionTitle1 = screen.getByText(
      "Você já se consultou com um psicólogo antes?",
    ) as HTMLDivElement;
    const optionTitle2 = screen.getByText(
      "Com qual gênero você se identifica?",
    ) as HTMLDivElement;
    const optionTitle3 = screen.getByText(
      "Você possui alguma dessas deficiências?",
    ) as HTMLDivElement;

    expect(optionTitle1).toBeInTheDocument();
    expect(optionTitle2).toBeInTheDocument();
    expect(optionTitle3).toBeInTheDocument();
  });
});

// TODO: test if values from server are being reflected on the fields
