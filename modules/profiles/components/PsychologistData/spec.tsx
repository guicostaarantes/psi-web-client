import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import PatientDataComponent from "@psi/profiles/components/PatientData";
import {
  GetCharacteristics,
  GetOwnPatientProfile,
} from "@psi/profiles/components/PatientData/graphql";

const mocks = [
  {
    request: {
      query: GetOwnPatientProfile,
    },
    result: {
      data: {
        getOwnPatientProfile: {
          id: "456",
          fullName: "Thomas Edward Patrick Brady, Jr.",
          likeName: "Tom Brady",
          birthDate: 239414400,
          city: "Boston - MA",
          characteristics: [
            {
              name: "has-consulted-before",
              type: "BOOLEAN",
              selectedValues: [],
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
              characteristicName: "black",
              selectedValue: "true",
              weight: 3,
            },
            {
              characteristicName: "black",
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
      query: GetCharacteristics,
    },
    result: {
      data: {
        getPatientCharacteristics: [
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
        getPsychologistCharacteristics: [
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

test("PatientDataComponent renders with data from database", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <PatientDataComponent />
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

  expect(fullName).toBeInTheDocument();
  expect(likeName).toBeInTheDocument();
  expect(birthDate).toBeInTheDocument();
  expect(city).toBeInTheDocument();

  await waitFor(() => {
    expect(fullName.value).toBe("Thomas Edward Patrick Brady, Jr.");
    expect(likeName.value).toBe("Tom Brady");
    expect(birthDate.value).toBe("02/08/1977");
    expect(city.value).toBe("Boston - MA");
  });
});
