import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import PsychologistGreeting from "@psi/home/components/PsychologistGreeting";
import { MyPsychologistLikeName } from "@psi/home/components/PsychologistGreeting/graphql";

const mocks = [
  {
    request: {
      query: MyPsychologistLikeName,
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

test("should render correct likeName", async () => {
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
