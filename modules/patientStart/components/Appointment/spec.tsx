import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import Appointment from "@psi/patientStart/components/Appointment";
import {
  MyPatientAppointments,
  MyPatientTreatments,
} from "@psi/patientStart/components/Appointment/graphql";

const now = 1612345678;
const yesterday = now - 86400;
const laterYesterday = now - 86400 + 3600;
const tomorrow = now + 86400;
const laterTomorrow = now + 86400 + 3600;

jest.mock("@psi/shared/hooks/useServerTime", () => {
  return jest.fn(() => now);
});

// TODO: test which buttons should appear depending on the status

test("should not render if no future appointments", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientAppointments,
      },
      result: {
        data: {
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: yesterday,
                end: laterYesterday,
                status: "CONFIRMED_BY_BOTH",
                price: 25,
                treatment: {
                  psychologist: {
                    likeName: "Tom Brady",
                  },
                },
              },
            ],
          },
        },
      },
    },
    {
      request: {
        query: MyPatientTreatments,
      },
      result: {
        data: {
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            likeName: "Patrick Mahomes",
            treatments: [
              {
                id: "ccdbba35-4390-4303-a01e-11010b2aaf1a",
                status: "INTERRUPTED_BY_PATIENT",
                psychologist: {
                  likeName: "Peyton Manning",
                },
              },
              {
                id: "8cd0203f-6aa0-4ec8-9857-c197c6d65453",
                status: "ACTIVE",
                psychologist: {
                  likeName: "Tom Brady",
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
      <Appointment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Você está em tratamento com Tom Brady");
    screen.getByText(
      "Em breve o sistema irá agendar uma nova consulta baseada no horário semanal definido para o seu tratamento. Você também receberá os detalhes por email quando essa consulta for marcada.",
    );
  });
});

test("should render message and confirm button for CREATED status", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientAppointments,
      },
      result: {
        data: {
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: tomorrow,
                end: laterTomorrow,
                status: "CREATED",
                price: 25,
                treatment: {
                  psychologist: {
                    likeName: "Tom Brady",
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
      <Appointment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Sua próxima consulta com Tom Brady");
    screen.getByText("Dia 04/02/2021 às 04:47");
    screen.getByText("Confirmar");
  });
});

test("should render message and confirm button for CONFIRMED_BY_PSYCHOLOGIST status", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientAppointments,
      },
      result: {
        data: {
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: tomorrow,
                end: laterTomorrow,
                status: "CONFIRMED_BY_PSYCHOLOGIST",
                price: 25,
                treatment: {
                  psychologist: {
                    likeName: "Tom Brady",
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
      <Appointment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Sua próxima consulta com Tom Brady");
    screen.getByText("Dia 04/02/2021 às 04:47");
    screen.getByText("Tom Brady já confirmou a consulta.");
    screen.getByText("Confirmar");
  });
});

test("should render message for CONFIRMED_BY_PATIENT status", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientAppointments,
      },
      result: {
        data: {
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: tomorrow,
                end: laterTomorrow,
                status: "CONFIRMED_BY_PATIENT",
                price: 25,
                treatment: {
                  psychologist: {
                    likeName: "Tom Brady",
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
      <Appointment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Sua próxima consulta com Tom Brady");
    screen.getByText("Dia 04/02/2021 às 04:47");
    screen.getByText(
      "Você confirmou a consulta. Aguardando confirmação de Tom Brady.",
    );
  });
});

test("should render message for CONFIRMED_BY_BOTH status", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientAppointments,
      },
      result: {
        data: {
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: tomorrow,
                end: laterTomorrow,
                status: "CONFIRMED_BY_BOTH",
                price: 25,
                treatment: {
                  psychologist: {
                    likeName: "Tom Brady",
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
      <Appointment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Sua próxima consulta com Tom Brady");
    screen.getByText("Dia 04/02/2021 às 04:47");
    screen.getByText("Você e Tom Brady confirmaram a consulta.");
  });
});

test("should render message and confirm button for EDITED_BY_PSYCHOLOGIST status", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientAppointments,
      },
      result: {
        data: {
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: tomorrow,
                end: laterTomorrow,
                status: "EDITED_BY_PSYCHOLOGIST",
                price: 25,
                treatment: {
                  psychologist: {
                    likeName: "Tom Brady",
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
      <Appointment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Sua próxima consulta com Tom Brady");
    screen.getByText("Dia 04/02/2021 às 04:47");
    screen.getByText("Tom Brady sugeriu uma mudança na consulta.");
    screen.getByText("Confirmar");
  });
});

test("should render message for EDITED_BY_PATIENT status", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientAppointments,
      },
      result: {
        data: {
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: tomorrow,
                end: laterTomorrow,
                status: "EDITED_BY_PATIENT",
                price: 25,
                treatment: {
                  psychologist: {
                    likeName: "Tom Brady",
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
      <Appointment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Sua próxima consulta com Tom Brady");
    screen.getByText("Dia 04/02/2021 às 04:47");
    screen.getByText("Você sugeriu uma mudança na consulta.");
  });
});

test("should render message for CANCELED_BY_PSYCHOLOGIST status", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientAppointments,
      },
      result: {
        data: {
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: tomorrow,
                end: laterTomorrow,
                status: "CANCELED_BY_PSYCHOLOGIST",
                price: 25,
                treatment: {
                  psychologist: {
                    likeName: "Tom Brady",
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
      <Appointment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Sua próxima consulta com Tom Brady");
    screen.getByText("Dia 04/02/2021 às 04:47");
    screen.getByText("Tom Brady cancelou essa consulta.");
  });
});

test("should render message for CANCELED_BY_PATIENT status", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientAppointments,
      },
      result: {
        data: {
          myPatientProfile: {
            id: "a7b3bb32-1919-49e1-93da-57daf96ae6d8",
            appointments: [
              {
                id: "c9b57db7-031f-42bc-b7cc-006c646eca3c",
                start: tomorrow,
                end: laterTomorrow,
                status: "CANCELED_BY_PATIENT",
                price: 25,
                treatment: {
                  psychologist: {
                    likeName: "Tom Brady",
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
      <Appointment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Sua próxima consulta com Tom Brady");
    screen.getByText("Dia 04/02/2021 às 04:47");
    screen.getByText("Você cancelou essa consulta.");
  });
});
