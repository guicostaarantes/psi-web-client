import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import PsychologistTreatments from "@psi/psychologistStart/components/Treatments";
import { MyPsychologistTreatmentsDocument } from "@psi/shared/graphql";

const mocks = [
  {
    request: {
      query: MyPsychologistTreatmentsDocument,
    },
    result: {
      data: {
        myPsychologistProfile: {
          id: "d7118050-c575-4a27-a964-b67700bd0d0d",
          treatments: [
            {
              id: "a10634a4-690d-44f8-b4ff-875979fee8d0",
              status: "ACTIVE",
              frequency: 1,
              phase: 4 * 86400 + 20 * 3600,
              duration: 50 * 60,
              priceRange: {
                name: "low",
                minimumPrice: 25,
                maximumPrice: 50,
              },
              patient: {
                fullName: "Tom Brady",
              },
            },
            {
              id: "c274f2b8-85e8-40a2-ac28-5fe384eca6c0",
              status: "PENDING",
              frequency: 2,
              phase: 7 * 86400 + 20 * 3600,
              duration: 60 * 60,
              priceRange: null,
              patient: null,
            },
          ],
          priceRangeOfferings: [
            {
              priceRange: {
                name: "medium",
                minimumPrice: 50,
                maximumPrice: 100,
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
      <PsychologistTreatments />
    </MockedProvider>,
  );

  await waitFor(() => {
    const patientName = screen.getByText("Paciente: Tom Brady");
    screen.getByText("Horário das sessões: às segundas-feiras às 15:00");
    screen.getByText("Duração de cada sessão: 50 minutos");
    screen.getByText("Valor cobrado por sessão: entre 25 e 50 reais");
    screen.getByText(
      "Horário das sessões: às quintas-feiras de semanas A às 15:00",
    );
    screen.getByText("Duração de cada sessão: 60 minutos");
    const newTreatmentButton = screen.getByText(
      "Quero tratar um novo paciente",
    );

    expect(patientName).toBeInTheDocument();

    fireEvent.click(newTreatmentButton);
    const createTreatmentButton = screen.getAllByText("Criar tratamento");
    expect(createTreatmentButton[1]).toBeInTheDocument();
  });
});
