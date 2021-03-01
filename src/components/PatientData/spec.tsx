import { MockedProvider } from "@apollo/client/testing";
import PatientDataComponent from "@src/components/PatientData";
import GetOwnPatientProfile from "@src/components/PatientData/graphql";
import { render, screen, waitFor } from "@testing-library/react";

const mock = [
  {
    request: {
      query: GetOwnPatientProfile,
    },
    result: {
      data: {
        getOwnPatientProfile: {
          fullName: "Thomas Edward Patrick Brady, Jr.",
          likeName: "Tom Brady",
          birthDate: 239414400,
          city: "Boston - MA",
          characteristics: [
            {
              name: "has-consulted-before",
              type: "BOOLEAN",
              selectedValues: [],
              possibleValues: ["true", "false"],
            },
            {
              name: "gender",
              type: "SINGLE",
              selectedValues: ["male"],
              possibleValues: ["male", "female", "non-binary"],
            },
            {
              name: "disabilities",
              type: "MULTIPLE",
              selectedValues: ["locomotion"],
              possibleValues: ["vision", "hearing", "locomotion"],
            },
          ],
          preferences: [],
        },
        getPsychologistCharacteristics: [],
      },
    },
  },
];

test("PatientDataComponent renders with data from database", async () => {
  render(
    <MockedProvider mocks={mock}>
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
    expect(birthDate.value).toBe("239414400");
    expect(city.value).toBe("Boston - MA");
  });
});