import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import Appointments from "@psi/psychologistStart/components/Appointments";
import { MyPsychologistAppointmentsDocument } from "@psi/shared/graphql";

const now = 1612345678;
const yesterday = now - 86400;
const laterYesterday = now - 86400 + 3600;
const tomorrow = now + 86400;
const laterTomorrow = now + 86400 + 3600;

jest.mock("@psi/shared/hooks/useServerTime", () => {
  return jest.fn(() => now);
});

const emptyMock = () => <span>Empty mock</span>;
jest.mock("@psi/shared/components/Empty", () => ({
  __esModule: true,
  default: emptyMock,
}));

test("should not render if no future appointments", async () => {
  const mocks = [
    {
      request: {
        query: MyPsychologistAppointmentsDocument,
      },
      result: {
        data: {
          myPsychologistProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: yesterday,
                end: laterYesterday,
                status: "CONFIRMED_BY_BOTH",
                price: 25,
                treatment: {
                  patient: {
                    fullName: "Patrick Mahomes",
                  },
                },
              },
            ],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <Appointments />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Empty mock");
  });
});

test("should render only future appointments", async () => {
  const mocks = [
    {
      request: {
        query: MyPsychologistAppointmentsDocument,
      },
      result: {
        data: {
          myPsychologistProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: yesterday,
                end: laterYesterday,
                status: "CONFIRMED_BY_BOTH",
                price: 25,
                treatment: {
                  patient: {
                    fullName: "Patrick Mahomes",
                  },
                },
              },
              {
                id: "774e5a34-d3a4-40a6-8c0f-4f8efb15a53a",
                start: tomorrow,
                end: laterTomorrow,
                status: "CONFIRMED_BY_BOTH",
                price: 25,
                treatment: {
                  patient: {
                    fullName: "Patrick Mahomes",
                  },
                },
              },
            ],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <Appointments />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Paciente: Patrick Mahomes");
  });
});
