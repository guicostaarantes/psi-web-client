import { Downgraded, useState } from "@hookstate/core";
import PreferenceChooserComponent from "@src/modules/profiles/components/PreferenceChooser";
import { render, screen, waitFor } from "@testing-library/react";

const initialPreferences: {
  name: string;
  type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
  possibleValues: string[];
}[] = [
  {
    name: "black",
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

const initialWeights: Record<string, Record<string, number>> = {
  black: {
    true: 3,
    false: -1,
  },
  gender: {
    male: 0,
    female: 1,
    "non-binary": 3,
  },
  disabilities: {
    vision: 0,
    hearing: 0,
    locomotion: 0,
  },
};

const initialMessages: Record<string, string> = {
  "pref:black:true":
    "Quão confortável você se sente sendo atendido por um psicólogo negro?",
  "pref:black:false":
    "Quão confortável você se sente sendo atendido por um psicólogo que não seja negro?",
  "pref:gender:male":
    "Quão confortável você se sente sendo atendido por um psicólogo do gênero masculino?",
  "pref:gender:female":
    "Quão confortável você se sente sendo atendido por um psicólogo do gênero feminino?",
  "pref:gender:non-binary":
    "Quão confortável você se sente sendo atendido por um psicólogo de gênero não binário?",
  "pref:disabilities:vision":
    "Quão confortável você se sente sendo atendido por um psicólogo com deficiência visual?",
  "pref:disabilities:hearing":
    "Quão confortável você se sente sendo atendido por um psicólogo com deficiência auditiva?",
  "pref:disabilities:locomotion":
    "Quão confortável você se sente sendo atendido por um psicólogo com deficiência locomotiva?",
};

const WrapperTestComponent = () => {
  const preferences = useState<
    {
      name: string;
      type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
      possibleValues: string[];
    }[]
  >(initialPreferences).attach(Downgraded);

  const weights = useState<Record<string, Record<string, number>>>(
    initialWeights,
  ).attach(Downgraded);

  const messages = useState<Record<string, string>>(initialMessages);

  return (
    <PreferenceChooserComponent
      preferences={preferences}
      weights={weights}
      messages={messages}
    />
  );
};
test("PreferenceChooserComponent renders options", async () => {
  render(<WrapperTestComponent />);

  await waitFor(() => {
    const optionTitle1 = screen.getByText(
      "Quão confortável você se sente sendo atendido por um psicólogo negro?",
    ) as HTMLDivElement;

    expect(optionTitle1).toBeInTheDocument();
  });
});

// TODO: test if values from server are being reflected on the fields
