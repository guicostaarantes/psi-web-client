import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import PatientGreeting from "@psi/home/components/PatientGreeting";
import { MyPatientLikeName } from "@psi/home/components/PatientGreeting/graphql";

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

test("should render correct likeName", async () => {
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
