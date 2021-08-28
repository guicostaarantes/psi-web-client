import { MockedProvider } from "@apollo/client/testing";
import { useState } from "@hookstate/core";
import { render, screen, waitFor } from "@testing-library/react";

import CharacteristicChooserComponent from "@psi/profiles/components/CharacteristicChooser";
import {
  Characteristic,
  CharacteristicType,
  GetCharacteristicMessagesDocument,
  GetCharacteristicsDocument,
  MyUserDocument,
} from "@psi/shared/graphql";

const mocks = [
  {
    request: { query: MyUserDocument },
    result: {
      data: {
        myUser: {
          id: "6c82b9eb-722a-48f5-9418-0fcd3fbbca47",
          email: "tom.brady@psi.com.br",
          role: "PATIENT",
        },
      },
    },
  },
  {
    request: {
      query: GetCharacteristicsDocument,
    },
    result: {
      data: {
        patientCharacteristics: [
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
        ],
        psychologistCharacteristics: [
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
        ],
      },
    },
  },
  {
    request: {
      query: GetCharacteristicMessagesDocument,
      variables: {
        lang: "pt-BR",
        keys: [
          "pat-char:has-consulted-before",
          "pat-char:has-consulted-before:true",
          "pat-char:has-consulted-before:false",
          "pat-char:gender",
          "pat-char:gender:male",
          "pat-char:gender:female",
          "pat-char:gender:non-binary",
          "pat-char:disabilities",
          "pat-char:disabilities:vision",
          "pat-char:disabilities:hearing",
          "pat-char:disabilities:locomotion",
          "psy-pref:black:true",
          "psy-pref:black:false",
          "psy-pref:gender:male",
          "psy-pref:gender:female",
          "psy-pref:gender:non-binary",
          "psy-pref:disabilities:vision",
          "psy-pref:disabilities:hearing",
          "psy-pref:disabilities:locomotion",
        ],
      },
    },
    result: {
      data: {
        translations: [
          {
            lang: "pt-BR",
            key: "pat-char:has-consulted-before",
            value: "Você já se consultou com um psicólogo alguma vez?",
          },
          {
            lang: "pt-BR",
            key: "pat-char:has-consulted-before:true",
            value: "Sim",
          },
          {
            lang: "pt-BR",
            key: "pat-char:has-consulted-before:false",
            value: "Não",
          },
          {
            lang: "pt-BR",
            key: "pat-char:gender",
            value: "Com qual desses gêneros você mais se identifica?",
          },
          {
            lang: "pt-BR",
            key: "pat-char:gender:male",
            value: "Masculino",
          },
          {
            lang: "pt-BR",
            key: "pat-char:gender:female",
            value: "Feminino",
          },
          {
            lang: "pt-BR",
            key: "pat-char:gender:non-binary",
            value: "Não binário",
          },
          {
            lang: "pt-BR",
            key: "pat-char:disabilities",
            value: "Você possui alguma dessas deficiências?",
          },
          {
            lang: "pt-BR",
            key: "pat-char:disabilities:vision",
            value: "Visual",
          },
          {
            lang: "pt-BR",
            key: "pat-char:disabilities:hearing",
            value: "Auditiva",
          },
          {
            lang: "pt-BR",
            key: "pat-char:disabilities:locomotion",
            value: "Locomotiva",
          },
          {
            lang: "pt-BR",
            key: "psy-pref:black:true",
            value:
              "Quão confortável você se sente sendo atendido por um psicólogo negro?",
          },
          {
            lang: "pt-BR",
            key: "psy-pref:black:false",
            value:
              "Quão confortável você se sente sendo atendido por um psicólogo que não seja negro?",
          },
          {
            lang: "pt-BR",
            key: "psy-pref:gender:male",
            value:
              "Quão confortável você se sente sendo atendido por um psicólogo do gênero masculino?",
          },
          {
            lang: "pt-BR",
            key: "psy-pref:gender:female",
            value:
              "Quão confortável você se sente sendo atendido por um psicólogo do gênero feminino?",
          },
          {
            lang: "pt-BR",
            key: "psy-pref:gender:non-binary",
            value:
              "Quão confortável você se sente sendo atendido por um psicólogo de gênero não binário?",
          },
          {
            lang: "pt-BR",
            key: "psy-pref:disabilities:vision",
            value:
              "Quão confortável você se sente sendo atendido por um psicólogo com deficiência visual?",
          },
          {
            lang: "pt-BR",
            key: "psy-pref:disabilities:hearing",
            value:
              "Quão confortável você se sente sendo atendido por um psicólogo com deficiência auditiva?",
          },
          {
            lang: "pt-BR",
            key: "psy-pref:disabilities:locomotion",
            value:
              "Quão confortável você se sente sendo atendido por um psicólogo com deficiência locomotiva?",
          },
        ],
      },
    },
  },
];

const characteristic: Characteristic = {
  name: "gender",
  type: CharacteristicType.Single,
  possibleValues: ["male", "female", "non-binary"],
};

const initialChoices: Record<string, unknown> = {};

const WrapperTestComponent = () => {
  const choices = useState<Record<string, unknown>>(initialChoices);

  return (
    <MockedProvider mocks={mocks}>
      <CharacteristicChooserComponent
        characteristic={characteristic}
        choices={choices}
      />
    </MockedProvider>
  );
};
test("CharacteristicChooserComponent renders options", async () => {
  render(<WrapperTestComponent />);

  await waitFor(() => {
    const optionTitle = screen.getByText(
      "Com qual desses gêneros você mais se identifica?",
    ) as HTMLDivElement;

    expect(optionTitle).toBeInTheDocument();
  });
});

// TODO: test if values from server are being reflected on the fields
