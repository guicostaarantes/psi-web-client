import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import Treatment from "@psi/patientStart/components/Treatment";
import { MyPatientTreatmentsDocument } from "@psi/shared/graphql";

test("should render awaiting profile if likeName is missing", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientTreatmentsDocument,
      },
      result: {
        data: {
          myPatientProfile: null,
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <Treatment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText(
      "Para encontrarmos os psicólogos com maior compatibilidade, pedimos que antes você preencha o seu perfil. Esse preenchimento costuma demorar entre 5 e 10 minutos.",
    );
  });
});

test("should render treatment selection if no active treatment", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientTreatmentsDocument,
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
            ],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <Treatment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText(
      "Você não está com nenhum tratamento atualmente. Utilize o nosso algoritmo para encontrar um psicólogo alinhado com suas características e preferências e iniciar um tratamento.",
    );
  });
});

test("should render interrupt treatment if active treatment", async () => {
  const mocks = [
    {
      request: {
        query: MyPatientTreatmentsDocument,
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
      <Treatment />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText(
      "Caso você não esteja achando o atual tratamento proveitoso, você pode interrompê-lo clicando no botão abaixo.",
    );
  });
});
