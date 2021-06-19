import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import PsychologistTreatments from "@psi/home/components/PsychologistTreatments";
import { MyPsychologistTreatments } from "@psi/home/components/PsychologistTreatments/graphql";

const mocks = [
  {
    request: {
      query: MyPsychologistTreatments,
    },
    result: {
      data: {
        myPsychologistProfile: {
          id: "d7118050-c575-4a27-a964-b67700bd0d0d",
          treatments: [
            {
              id: "a10634a4-690d-44f8-b4ff-875979fee8d0",
              status: "ACTIVE",
              weeklyStart: 1 * 86400 + 20 * 60 * 60,
              duration: 50 * 60,
              price: 25,
              patient: {
                fullName: "Tom Brady",
              },
            },
            {
              id: "c274f2b8-85e8-40a2-ac28-5fe384eca6c0",
              status: "PENDING",
              weeklyStart: 8 * 60 * 60,
              duration: 60 * 60,
              price: 30,
              patient: null,
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
    screen.getByText("Horário das sessões: toda segunda-feira às 20:00");
    screen.getByText("Duração de cada sessão: 50 minutos");
    screen.getByText("Valor cobrado por sessão: R$25.00");
    screen.getByText("Horário das sessões: todo domingo às 08:00");
    screen.getByText("Duração de cada sessão: 60 minutos");
    screen.getByText("Valor cobrado por sessão: R$30.00");
    const newTreatmentButton = screen.getByText(
      "Quero tratar um novo paciente",
    );

    expect(patientName).toBeInTheDocument();

    fireEvent.click(newTreatmentButton);
    const createTreatmentButton = screen.getAllByText("Criar tratamento");
    expect(createTreatmentButton[1]).toBeInTheDocument();
  });
});
