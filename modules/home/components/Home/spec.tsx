import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import { MyUserResponseData } from "@psi/auth/hooks/useCurrentUser/graphql";
import Home from "@psi/home/components/Home";
import { MyPatientLikeName } from "@psi/home/components/PatientGreeting/graphql";
import { MyPsychologistLikeName } from "@psi/home/components/PsychologistGreeting/graphql";

let mockUser: MyUserResponseData;

jest.mock("@psi/auth/hooks/useCurrentUser", () => {
  return jest.fn(() => mockUser);
});

const patientMocks = [
  {
    request: {
      query: MyPatientLikeName,
    },
    result: {
      data: {
        myPatientProfile: {
          id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
          likeName: "Tom Brady",
        },
      },
    },
  },
];

const psychologistMocks = [
  {
    request: {
      query: MyPsychologistLikeName,
    },
    result: {
      data: {
        myPsychologistProfile: {
          id: "fb01ceb9-0d6e-4f3d-87af-3e178681e05a",
          likeName: "Peyton Manning",
        },
      },
    },
  },
];

test("should render patient data if user is patient", async () => {
  mockUser = {
    id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
    email: "tom.brady@psi.com.br",
    role: "PATIENT",
  };

  render(
    <MockedProvider mocks={patientMocks}>
      <Home />
    </MockedProvider>,
  );

  await waitFor(() => {
    const greetingText = screen.getByText("Oi Tom Brady");

    expect(greetingText).toBeInTheDocument();
  });
});

test("should render psychologist data if user is psychologist", async () => {
  mockUser = {
    id: "fb01ceb9-0d6e-4f3d-87af-3e178681e05a",
    email: "peyton.manning@psi.com.br",
    role: "PSYCHOLOGIST",
  };

  render(
    <MockedProvider mocks={psychologistMocks}>
      <Home />
    </MockedProvider>,
  );

  await waitFor(() => {
    const greetingText = screen.getByText("Oi Peyton Manning");

    expect(greetingText).toBeInTheDocument();
  });
});
