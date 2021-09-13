import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import Home from "@psi/psychologistStart/components/Home";
import {
  MyPsychologistAppointmentsDocument,
  MyPsychologistGreetingDocument,
} from "@psi/shared/graphql";

const mocks = [
  {
    request: {
      query: MyPsychologistGreetingDocument,
    },
    result: {
      data: {
        myPsychologistProfile: {
          id: "fb01ceb9-0d6e-4f3d-87af-3e178681e05a",
          likeName: "Peyton Manning",
          avatar: "1234abcd",
        },
      },
    },
  },
  {
    request: {
      query: MyPsychologistAppointmentsDocument,
    },
    result: {
      data: {
        myPsychologistProfile: {
          id: "fb01ceb9-0d6e-4f3d-87af-3e178681e05a",
          appointments: [],
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
