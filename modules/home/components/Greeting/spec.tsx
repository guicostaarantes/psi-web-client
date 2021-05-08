import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import Greeting from "@psi/home/components/Greeting";
import { GetOwnLikeName } from "@psi/home/components/Greeting/graphql";

const mocks = [
  {
    request: {
      query: GetOwnLikeName,
    },
    result: {
      data: {
        getOwnPatientProfile: {
          likeName: "Tom Brady",
        },
      },
    },
  },
];

test("should render", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <Greeting />
    </MockedProvider>,
  );

  await waitFor(() => {
    const greetingText = screen.getByText("Oi Tom Brady");

    expect(greetingText).toBeInTheDocument();
  });
});
