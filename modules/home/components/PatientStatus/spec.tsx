import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MyUserResponseData } from "@psi/auth/hooks/useCurrentUser/graphql";
import PatientStatus from "@psi/home/components/PatientStatus";
import { GetTreatmentsAppointments } from "@psi/home/components/PatientStatus/graphql";

const now = 1612345678;
const yesterday = now - 86400;
const tomorrow = now + 86400;

let mockUser: MyUserResponseData;

jest.mock("@psi/auth/hooks/useCurrentUser", () => {
  return jest.fn(() => mockUser);
});

const mockPushRoute = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPushRoute,
  }),
}));

beforeEach(() => {
  mockPushRoute.mockClear();
});

test("should render nothing if user is not patient", async () => {
  mockUser = {
    id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
    email: "tom.brady@psi.com.br",
    role: "PSYCHOLOGIST",
  };

  const { container } = render(
    <MockedProvider mocks={[]}>
      <PatientStatus />
    </MockedProvider>,
  );

  await waitFor(() => expect(container).toBeEmptyDOMElement(), {
    timeout: 1000,
  });
});

test("should render AWAITING_PROFILE if user has no likeName", async () => {
  mockUser = {
    id: "123",
    email: "tom.brady@psi.com.br",
    role: "PATIENT",
  };

  const mocks = [
    {
      request: {
        query: GetTreatmentsAppointments,
      },
      result: {
        data: {
          time: now,
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            likeName: "",
            treatments: [],
            appointments: [],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <PatientStatus />
    </MockedProvider>,
  );

  await waitFor(() => {
    const button = screen.getByText(
      "Preencher meu perfil",
    ) as HTMLButtonElement;

    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(mockPushRoute).toBeCalledTimes(1);
    expect(mockPushRoute).toBeCalledWith("/paciente");
  });
});

test("should render TREATMENT_SELECTION if user has no active or pending treatment", async () => {
  mockUser = {
    id: "123",
    email: "tom.brady@psi.com.br",
    role: "PATIENT",
  };

  const mocks = [
    {
      request: {
        query: GetTreatmentsAppointments,
      },
      result: {
        data: {
          time: now,
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            likeName: "Tom Brady",
            treatments: [
              {
                id: "0a8460a8-1bd2-4243-86bf-884f7a13ee8a",
                status: "FINALIZED",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "7ed839b0-a0d1-468d-8f6a-300c5375eae3",
                status: "INTERRUPTED_BY_PSYCHOLOGIST",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "ca54685f-967d-463f-84c2-792c8a75fd77",
                status: "INTERRUPTED_BY_PATIENT",
                psychologist: {
                  likeName: "John",
                },
              },
            ],
            appointments: [],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <PatientStatus />
    </MockedProvider>,
  );

  await waitFor(() => {
    const button = screen.getByText(
      "Encontrar um psicólogo",
    ) as HTMLButtonElement;

    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(mockPushRoute).toBeCalledTimes(1);
    expect(mockPushRoute).toBeCalledWith("/tratamento");
  });
});

test("should render APPOINTMENT_SELECTION if user has an active treatment but no proposed/confirmed appointments", async () => {
  mockUser = {
    id: "123",
    email: "tom.brady@psi.com.br",
    role: "PATIENT",
  };

  const mocks = [
    {
      request: {
        query: GetTreatmentsAppointments,
      },
      result: {
        data: {
          time: now,
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            likeName: "Tom Brady",
            treatments: [
              {
                id: "0a8460a8-1bd2-4243-86bf-884f7a13ee8a",
                status: "FINALIZED",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "7ed839b0-a0d1-468d-8f6a-300c5375eae3",
                status: "INTERRUPTED_BY_PSYCHOLOGIST",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "ca54685f-967d-463f-84c2-792c8a75fd77",
                status: "INTERRUPTED_BY_PATIENT",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "b8c85fd4-47fa-41a1-a4b4-9e0941ae9254",
                status: "ACTIVE",
                psychologist: {
                  likeName: "John",
                },
              },
            ],
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                end: yesterday,
                status: "DENIED",
              },
              {
                id: "1312ae55-9e16-4f68-b457-d13f5f1c3724",
                end: yesterday,
                status: "CANCELED_BY_PSYCHOLOGIST",
              },
              {
                id: "8fb17b4c-7394-4605-977e-476ee16a071b",
                end: yesterday,
                status: "CANCELED_BY_PATIENT",
              },
            ],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <PatientStatus />
    </MockedProvider>,
  );

  await waitFor(() => {
    const button = screen.getByText(
      "Marcar próxima consulta",
    ) as HTMLButtonElement;

    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(mockPushRoute).toBeCalledTimes(1);
    expect(mockPushRoute).toBeCalledWith("/consulta");
  });

  await waitFor(() => {
    const button = screen.getByText(
      "Interromper tratamento",
    ) as HTMLButtonElement;

    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(mockPushRoute).toBeCalledTimes(2);
    expect(mockPushRoute).toBeCalledWith("/interromper");
  });
});

test("should render APPOINTMENT_SELECTION if user has an active treatment but all proposed/confirmed appointments are in the past", async () => {
  mockUser = {
    id: "123",
    email: "tom.brady@psi.com.br",
    role: "PATIENT",
  };

  const mocks = [
    {
      request: {
        query: GetTreatmentsAppointments,
      },
      result: {
        data: {
          time: now,
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            likeName: "Tom Brady",
            treatments: [
              {
                id: "0a8460a8-1bd2-4243-86bf-884f7a13ee8a",
                status: "FINALIZED",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "7ed839b0-a0d1-468d-8f6a-300c5375eae3",
                status: "INTERRUPTED_BY_PSYCHOLOGIST",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "ca54685f-967d-463f-84c2-792c8a75fd77",
                status: "INTERRUPTED_BY_PATIENT",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "b8c85fd4-47fa-41a1-a4b4-9e0941ae9254",
                status: "ACTIVE",
                psychologist: {
                  likeName: "John",
                },
              },
            ],
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                end: yesterday,
                status: "DENIED",
              },
              {
                id: "1312ae55-9e16-4f68-b457-d13f5f1c3724",
                end: yesterday,
                status: "CANCELED_BY_PSYCHOLOGIST",
              },
              {
                id: "8fb17b4c-7394-4605-977e-476ee16a071b",
                end: yesterday,
                status: "CANCELED_BY_PATIENT",
              },
              {
                id: "63fad2b4-9b4f-40ee-bf60-b3337f16e2b3",
                end: yesterday,
                status: "CONFIRMED",
              },
              {
                id: "3832b858-3de9-4f24-945a-ed2fafd1bb01",
                end: yesterday,
                status: "PROPOSED",
              },
            ],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <PatientStatus />
    </MockedProvider>,
  );

  await waitFor(() => {
    const button = screen.getByText(
      "Marcar próxima consulta",
    ) as HTMLButtonElement;

    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(mockPushRoute).toBeCalledTimes(1);
    expect(mockPushRoute).toBeCalledWith("/consulta");
  });

  await waitFor(() => {
    const button = screen.getByText(
      "Interromper tratamento",
    ) as HTMLButtonElement;

    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(mockPushRoute).toBeCalledTimes(2);
    expect(mockPushRoute).toBeCalledWith("/interromper");
  });
});

test("should render APPOINTMENT_APPROVAL if user has an active treatment and a proposed appointment in the future", async () => {
  mockUser = {
    id: "123",
    email: "tom.brady@psi.com.br",
    role: "PATIENT",
  };

  const mocks = [
    {
      request: {
        query: GetTreatmentsAppointments,
      },
      result: {
        data: {
          time: now,
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            likeName: "Tom Brady",
            treatments: [
              {
                id: "0a8460a8-1bd2-4243-86bf-884f7a13ee8a",
                status: "FINALIZED",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "7ed839b0-a0d1-468d-8f6a-300c5375eae3",
                status: "INTERRUPTED_BY_PSYCHOLOGIST",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "ca54685f-967d-463f-84c2-792c8a75fd77",
                status: "INTERRUPTED_BY_PATIENT",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "b8c85fd4-47fa-41a1-a4b4-9e0941ae9254",
                status: "ACTIVE",
                psychologist: {
                  likeName: "John",
                },
              },
            ],
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                end: yesterday,
                status: "DENIED",
              },
              {
                id: "1312ae55-9e16-4f68-b457-d13f5f1c3724",
                end: yesterday,
                status: "CANCELED_BY_PSYCHOLOGIST",
              },
              {
                id: "8fb17b4c-7394-4605-977e-476ee16a071b",
                end: yesterday,
                status: "CANCELED_BY_PATIENT",
              },
              {
                id: "63fad2b4-9b4f-40ee-bf60-b3337f16e2b3",
                end: yesterday,
                status: "CONFIRMED",
              },
              {
                id: "3832b858-3de9-4f24-945a-ed2fafd1bb01",
                end: tomorrow,
                status: "PROPOSED",
              },
            ],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <PatientStatus />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.getByText("APPOINTMENT_APPROVAL");

    expect(text).toBeInTheDocument();
  });
});

test("should render APPOINTMENT_READY if user has an active treatment and a confirmed appointment in the future", async () => {
  mockUser = {
    id: "123",
    email: "tom.brady@psi.com.br",
    role: "PATIENT",
  };

  const mocks = [
    {
      request: {
        query: GetTreatmentsAppointments,
      },
      result: {
        data: {
          time: now,
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            likeName: "Tom Brady",
            treatments: [
              {
                id: "0a8460a8-1bd2-4243-86bf-884f7a13ee8a",
                status: "FINALIZED",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "7ed839b0-a0d1-468d-8f6a-300c5375eae3",
                status: "INTERRUPTED_BY_PSYCHOLOGIST",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "ca54685f-967d-463f-84c2-792c8a75fd77",
                status: "INTERRUPTED_BY_PATIENT",
                psychologist: {
                  likeName: "John",
                },
              },
              {
                id: "b8c85fd4-47fa-41a1-a4b4-9e0941ae9254",
                status: "ACTIVE",
                psychologist: {
                  likeName: "John",
                },
              },
            ],
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                end: yesterday,
                status: "DENIED",
              },
              {
                id: "1312ae55-9e16-4f68-b457-d13f5f1c3724",
                end: yesterday,
                status: "CANCELED_BY_PSYCHOLOGIST",
              },
              {
                id: "8fb17b4c-7394-4605-977e-476ee16a071b",
                end: yesterday,
                status: "CANCELED_BY_PATIENT",
              },
              {
                id: "63fad2b4-9b4f-40ee-bf60-b3337f16e2b3",
                end: tomorrow,
                status: "CONFIRMED",
              },
              {
                id: "3832b858-3de9-4f24-945a-ed2fafd1bb01",
                end: yesterday,
                status: "PROPOSED",
              },
            ],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <PatientStatus />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.getByText("APPOINTMENT_READY");

    expect(text).toBeInTheDocument();
  });
});
