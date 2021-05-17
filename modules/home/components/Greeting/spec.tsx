import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import Greeting from "@psi/home/components/Greeting";
import { MyLikeName } from "@psi/home/components/Greeting/graphql";

const mocks = [
  {
    request: {
      query: MyLikeName,
    },
    result: {
      data: {
        myPatientProfile: {
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
