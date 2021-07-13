import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import PatientDataComponent from "@psi/profiles/components/PatientData";
import {
  GetCharacteristics,
  MyPatientProfile,
} from "@psi/profiles/components/PatientData/graphql";

const mocks = [
  {
    request: {
      query: MyPatientProfile,
    },
    result: {
      data: {
        myPatientProfile: {
          id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
          fullName: "Thomas Edward Patrick Brady, Jr.",
          likeName: "Tom Brady",
          birthDate: 239457600,
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
    expect(birthDate.value).toBe("03/08/1977");
    expect(city.value).toBe("Boston - MA");
  });
});
