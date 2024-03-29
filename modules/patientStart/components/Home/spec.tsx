import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import Home from "@psi/patientStart/components/Home";
import { MyPatientGreetingDocument } from "@psi/shared/graphql";

const mocks = [
  {
    request: {
      query: MyPatientGreetingDocument,
    },
    result: {
      data: {
        myPatientProfile: {
          id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
          likeName: "Tom Brady",
          avatar: "1234abcd",
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
