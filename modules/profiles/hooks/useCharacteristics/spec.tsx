import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import useCharacteristics from "@psi/profiles/hooks/useCharacteristics";
import {
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
          id: "70d99987-385f-4ab5-b9b1-09c09374d5aa",
          email: "peyton.manning@psi.com.br",
          role: "PSYCHOLOGIST",
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
          "psy-char:black",
          "psy-char:black:true",
          "psy-char:black:false",
          "psy-char:gender",
          "psy-char:gender:male",
          "psy-char:gender:female",
          "psy-char:gender:non-binary",
          "psy-char:disabilities",
          "psy-char:disabilities:vision",
          "psy-char:disabilities:hearing",
          "psy-char:disabilities:locomotion",
          "pat-pref:has-consulted-before:true",
          "pat-pref:has-consulted-before:false",
          "pat-pref:gender:male",
          "pat-pref:gender:female",
          "pat-pref:gender:non-binary",
          "pat-pref:disabilities:vision",
          "pat-pref:disabilities:hearing",
          "pat-pref:disabilities:locomotion",
        ],
      },
    },
    result: {
      data: {
        translations: [
          {
            lang: "pt-BR",
            key: "psy-char:black",
            value: "Você é negro(a)?",
          },
          {
            lang: "pt-BR",
            key: "psy-char:black:true",
            value: "Sim",
          },
          {
            lang: "pt-BR",
            key: "psy-char:black:false",
            value: "Não",
          },
          {
            lang: "pt-BR",
            key: "psy-char:gender",
            value: "Com qual desses gêneros você mais se identifica?",
          },
          {
            lang: "pt-BR",
            key: "psy-char:gender:male",
            value: "Masculino",
          },
          {
            lang: "pt-BR",
            key: "psy-char:gender:female",
            value: "Feminino",
          },
          {
            lang: "pt-BR",
            key: "psy-char:gender:non-binary",
            value: "Não binário",
          },
          {
            lang: "pt-BR",
            key: "psy-char:disabilities",
            value: "Você possui alguma dessas deficiências?",
          },
          {
            lang: "pt-BR",
            key: "psy-char:disabilities:vision",
            value: "Visual",
          },
          {
            lang: "pt-BR",
            key: "psy-char:disabilities:hearing",
            value: "Auditiva",
          },
          {
            lang: "pt-BR",
            key: "psy-char:disabilities:locomotion",
            value: "Locomotiva",
          },
          {
            lang: "pt-BR",
            key: "pat-pref:has-consulted-before:true",
            value:
              "Quão interessado você está em atender pacientes que já fizeram tratamento psicológico anteriormente?",
          },
          {
            lang: "pt-BR",
            key: "pat-pref:has-consulted-before:false",
            value:
              "Quão interessado você está em atender pacientes que nunca fizeram tratamento psicológico?",
          },
          {
            lang: "pt-BR",
            key: "pat-pref:gender:male",
            value:
              "Quão interessado você está em atender pacientes do gênero masculino?",
          },
          {
            lang: "pt-BR",
            key: "pat-pref:gender:female",
            value:
              "Quão interessado você está em atender pacientes do gênero feminino?",
          },
          {
            lang: "pt-BR",
            key: "pat-pref:gender:non-binary",
            value:
              "Quão interessado você está em atender pacientes de gênero não binário?",
          },
          {
            lang: "pt-BR",
            key: "pat-pref:disabilities:vision",
            value:
              "Quão interessado você está em atender pacientes com deficiência visual?",
          },
          {
            lang: "pt-BR",
            key: "pat-pref:disabilities:hearing",
            value:
              "Quão interessado você está em atender pacientes com deficiência auditiva?",
          },
          {
            lang: "pt-BR",
            key: "pat-pref:disabilities:locomotion",
            value:
              "Quão interessado você está em atender pacientes com deficiência locomotiva?",
          },
        ],
      },
    },
  },
];

const TestComponent = () => {
  const { characteristics, messages } = useCharacteristics();

  return (
    <>
      {characteristics?.psychologistCharacteristics.map((char) => (
        <div key={char.name}>
          <span>char: {messages[`psy-char:${char.name}`]}</span>
          {char.possibleValues.map((pv) => (
            <span key={pv}>
              char-option: {messages[`psy-char:${char.name}:${pv}`]}
            </span>
          ))}
        </div>
      ))}
      {characteristics?.patientCharacteristics.map((char) =>
        char.possibleValues.map((pv) => (
          <span key={pv}>pref: {messages[`pat-pref:${char.name}:${pv}`]}</span>
        )),
      )}
    </>
  );
};

test("should get token from search params", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <TestComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const elem1 = screen.getByText(
      "char: Com qual desses gêneros você mais se identifica?",
    );
    const elem2 = screen.getByText("char-option: Masculino");
    const elem3 = screen.getByText("char-option: Feminino");
    const elem4 = screen.getByText("char-option: Não binário");
    const elem5 = screen.getByText(
      "pref: Quão interessado você está em atender pacientes com deficiência locomotiva?",
    );

    expect(elem1).toBeInTheDocument();
    expect(elem2).toBeInTheDocument();
    expect(elem3).toBeInTheDocument();
    expect(elem4).toBeInTheDocument();
    expect(elem5).toBeInTheDocument();
  });
});
