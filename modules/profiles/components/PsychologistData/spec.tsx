import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import PsychologistDataComponent from "@psi/profiles/components/PsychologistData";
import {
  GetCharacteristicsDocument,
  MyPsychologistProfileDocument,
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
      query: MyPsychologistProfileDocument,
    },
    result: {
      data: {
        myPsychologistProfile: {
          id: "7289bb4f-eb82-4f6e-8cde-d02d52eeed1c",
          fullName: "Peyton Williams Manning",
          likeName: "Peyton Manning",
          birthDate: 196527600,
          city: "Indianapolis - IN",
          bio: "Hi, my name is Peyton Manning",
          avatar: "abcd1234",
          characteristics: [
            {
              name: "black",
              type: "BOOLEAN",
              selectedValues: ["false"],
            },
            {
              name: "gender",
              type: "SINGLE",
              selectedValues: ["male"],
            },
            {
              name: "disabilities",
              type: "MULTIPLE",
              selectedValues: ["locomotion"],
            },
          ],
          preferences: [
            {
              characteristicName: "has-consulted-before",
              selectedValue: "true",
              weight: 3,
            },
            {
              characteristicName: "has-consulted-before",
              selectedValue: "false",
              weight: -3,
            },
          ],
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
          {
            name: "income",
            type: "SINGLE",
            possibleValues: ["D", "C", "B", "A"],
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
];

test("PsychologistDataComponent renders with data from database", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <PsychologistDataComponent />
    </MockedProvider>,
  );

  const fullName = screen.getByLabelText("Nome completo") as HTMLInputElement;
  const likeName = screen.getByLabelText(
    "Nome pelo qual gostaria de ser chamado",
  ) as HTMLInputElement;
  const birthDate = screen.getByLabelText(
    "Data de nascimento",
  ) as HTMLInputElement;
  const city = screen.getByLabelText(
    "Cidade em que reside",
  ) as HTMLInputElement;
  const bio = screen.getByLabelText(
    "Fale sobre você para seus potenciais pacientes",
  ) as HTMLTextAreaElement;

  expect(fullName).toBeInTheDocument();
  expect(likeName).toBeInTheDocument();
  expect(birthDate).toBeInTheDocument();
  expect(city).toBeInTheDocument();
  expect(bio).toBeInTheDocument();

  await waitFor(() => {
    expect(fullName.value).toBe("Peyton Williams Manning");
    expect(likeName.value).toBe("Peyton Manning");
    expect(birthDate.value).toBe("24/03/1976");
    expect(city.value).toBe("Indianapolis - IN");
    expect(bio.value).toBe("Hi, my name is Peyton Manning");
  });
});
