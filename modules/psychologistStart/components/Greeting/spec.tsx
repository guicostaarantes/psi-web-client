import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import PsychologistGreeting from "@psi/psychologistStart/components/Greeting";
import { MyPsychologistGreetingDocument } from "@psi/shared/graphql";

global.fetch = jest.fn();

const mocks = [
  {
    request: {
      query: MyPsychologistGreetingDocument,
    },
    result: {
      data: {
        myPsychologistProfile: {
          id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
          likeName: "Peyton Manning",
          avatar: "1234abcd",
        },
      },
    },
  },
];

test("should render correct likeName and avatar", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <PsychologistGreeting />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Oi Peyton Manning");
    screen.getAllByAltText("Avatar de Peyton Manning");
  });
});
