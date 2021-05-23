import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import PsychologistTreatments from "@psi/home/components/PsychologistTreatments";
import { MyPsychologistTreatments } from "@psi/home/components/PsychologistTreatments/graphql";

const mockPushRoute = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPushRoute,
  }),
}));

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
              duration: 50 * 60,
              price: 25,
              interval: 7 * 86400,
              patient: {
                fullName: "Tom Brady",
              },
            },
            {
              id: "c274f2b8-85e8-40a2-ac28-5fe384eca6c0",
              status: "PENDING",
              duration: 60 * 60,
              price: 30,
              interval: 14 * 86400,
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
    const patientName = screen.getByText("Tom Brady");
    const activeTreatmentInfo = screen.getByText(
      "50 minutos por sessão | Sessões a cada 7 dias | R$25.00 por sessão",
    );
    const pendingTreatmentInfo = screen.getByText(
      "60 minutos por sessão | Sessões a cada 14 dias | R$30.00 por sessão",
    );
    const newTreatmentButton = screen.getByText("Quero tratar um paciente");

    expect(patientName).toBeInTheDocument();
    expect(activeTreatmentInfo).toBeInTheDocument();
    expect(pendingTreatmentInfo).toBeInTheDocument();

    fireEvent.click(newTreatmentButton);
  });

  await waitFor(() => {
    expect(mockPushRoute).toBeCalledTimes(1);
    expect(mockPushRoute).toBeCalledWith("/novo-tratamento");
  });
});
