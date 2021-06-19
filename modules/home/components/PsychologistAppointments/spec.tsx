import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import PsychologistAppointments from "@psi/home/components/PsychologistAppointments";
import { MyPsychologistAppointments } from "@psi/home/components/PsychologistAppointments/graphql";

const now = 1612345678;
const tomorrow = now + 86400;

jest.mock("@psi/shared/hooks/useServerTime", () => {
  return jest.fn(() => now);
});

const mockPushRoute = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPushRoute,
  }),
}));

const mocks = [
  {
    request: {
      query: MyPsychologistAppointments,
    },
    result: {
      data: {
        myPsychologistProfile: {
          id: "d7118050-c575-4a27-a964-b67700bd0d0d",
          appointments: [
            {
              id: "2e9686b6-1bf3-42d0-9a59-e9ec278d34b6",
              start: tomorrow,
              end: tomorrow + 3600,
              status: "PROPOSED",
              patient: {
                fullName: "Tom Brady",
              },
            },
          ],
        },
      },
    },
  },
];

test("should render", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <PsychologistAppointments />
    </MockedProvider>,
  );

  await waitFor(() => {
    const patientName = screen.getByText("Tom Brady");
    const appointmentDate = screen.getByText("04/02/2021, das 09:47 às 10:47");

    expect(patientName).toBeInTheDocument();
    expect(appointmentDate).toBeInTheDocument();
  });
});
