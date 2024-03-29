import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import PatientDataComponent from "@psi/profiles/components/PatientData";
import {
  GetCharacteristicsDocument,
  MyPatientProfileDocument,
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
      query: MyPatientProfileDocument,
    },
    result: {
      data: {
        myPatientProfile: {
          id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
          fullName: "Thomas Edward Patrick Brady, Jr.",
          likeName: "Tom Brady",
          birthDate: new Date(1977, 7, 3, 7),
          city: "Boston - MA",
          avatar: "abcd1234",
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
          agreements: [
            {
              termName: "emergency",
              termVersion: 1,
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
