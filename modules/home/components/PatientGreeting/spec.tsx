import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import { MyUserResponseData } from "@psi/auth/hooks/useCurrentUser/graphql";
import PatientGreeting from "@psi/home/components/PatientGreeting";
import { MyLikeName } from "@psi/home/components/PatientGreeting/graphql";

let mockUser: MyUserResponseData;

jest.mock("@psi/auth/hooks/useCurrentUser", () => {
  return jest.fn(() => mockUser);
});

const mocks = [
  {
    request: {
      query: MyLikeName,
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

test("should render", async () => {
  mockUser = {
    id: "123",
    email: "tom.brady@psi.com.br",
    role: "PATIENT",
  };

  render(
    <MockedProvider mocks={mocks}>
      <PatientGreeting />
    </MockedProvider>,
  );

  await waitFor(() => {
    const greetingText = screen.getByText("Oi Tom Brady");

    expect(greetingText).toBeInTheDocument();
  });
});

test("should not render if user is patient", async () => {
  mockUser = {
    id: "123",
    email: "peyton.manning@psi.com.br",
    role: "PSYCHOLOGIST",
  };

  const { container } = render(
    <MockedProvider mocks={mocks}>
      <PatientGreeting />
    </MockedProvider>,
  );

  await waitFor(() => expect(container).toBeEmptyDOMElement(), {
    timeout: 1000,
  });
});
