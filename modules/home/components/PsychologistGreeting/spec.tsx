import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import { MyUserResponseData } from "@psi/auth/hooks/useCurrentUser/graphql";
import PsychologistGreeting from "@psi/home/components/PsychologistGreeting";
import { MyLikeName } from "@psi/home/components/PsychologistGreeting/graphql";

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
        myPsychologistProfile: {
          id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
          likeName: "Peyton Manning",
        },
      },
    },
  },
];

test("should render", async () => {
  mockUser = {
    id: "123",
    email: "peyton.manning@psi.com.br",
    role: "PSYCHOLOGIST",
  };

  render(
    <MockedProvider mocks={mocks}>
      <PsychologistGreeting />
    </MockedProvider>,
  );

  await waitFor(() => {
    const greetingText = screen.getByText("Oi Peyton Manning");

    expect(greetingText).toBeInTheDocument();
  });
});

test("should not render if user is patient", async () => {
  mockUser = {
    id: "123",
    email: "tom.brady@psi.com.br",
    role: "PATIENT",
  };

  const { container } = render(
    <MockedProvider mocks={mocks}>
      <PsychologistGreeting />
    </MockedProvider>,
  );

  await waitFor(() => expect(container).toBeEmptyDOMElement(), {
    timeout: 1000,
  });
});
