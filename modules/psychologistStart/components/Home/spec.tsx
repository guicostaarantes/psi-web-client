import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import { MyPsychologistLikeName } from "@psi/psychologistStart/components/Greeting/graphql";
import Home from "@psi/psychologistStart/components/Home";

const mocks = [
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

test("should render psychologist data", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <Home />
    </MockedProvider>,
  );

  await waitFor(() => {
    const greetingText = screen.getByText("Oi Peyton Manning");

    expect(greetingText).toBeInTheDocument();
  });
});
