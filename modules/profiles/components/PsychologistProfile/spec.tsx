import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import PsychologistProfile from "@psi/profiles/components/PsychologistProfile";
import { PsychologistProfileDocument } from "@psi/shared/graphql";

const mocks = [
  {
    request: {
      query: PsychologistProfileDocument,
      variables: {
        id: "c013aa17-6835-4392-8fd2-37d1e5c20da2",
      },
    },
    result: {
      data: {
        psychologistProfile: {
          id: "c013aa17-6835-4392-8fd2-37d1e5c20da2",
          fullName: "Peyton Williams Manning",
          likeName: "Peyton Manning",
          city: "Indianapolis - IN",
          crp: "06/123456",
          whatsapp: "(31) 98765-4321",
          instagram: "@peytonmanning",
          bio: "Hi, my name is Peyton Manning",
          avatar: "1234abcd",
        },
      },
    },
  },
];

test("should show name of psychologist", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <PsychologistProfile id="c013aa17-6835-4392-8fd2-37d1e5c20da2" />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByAltText("Avatar de Peyton Manning");
    screen.getByText("Peyton Manning");
    screen.getByText("Peyton Williams Manning");
    screen.getByText("Hi, my name is Peyton Manning");
  });
});
