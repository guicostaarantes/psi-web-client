import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import { MyPatientLikeName } from "@psi/patientStart/components/Greeting/graphql";
import Home from "@psi/patientStart/components/Home";

const mocks = [
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

test("should render patient data", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <Home />
    </MockedProvider>,
  );

  await waitFor(() => {
    const greetingText = screen.getByText("Oi Tom Brady");

    expect(greetingText).toBeInTheDocument();
  });
});
