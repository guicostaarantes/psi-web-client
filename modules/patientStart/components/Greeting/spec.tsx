import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import PatientGreeting from "@psi/patientStart/components/Greeting";
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

test("should render correct likeName", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <PatientGreeting />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Oi Tom Brady");
    screen.getAllByAltText("Avatar de Tom Brady");
  });
});
