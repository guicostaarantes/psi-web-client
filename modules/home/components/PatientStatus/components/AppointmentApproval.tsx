import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import {
  GetTreatmentsAppointments,
  GetTreatmentsAppointmentsResponse,
} from "@psi/home/components/PatientStatus/graphql";
import useServerTime from "@psi/shared/hooks/useServerTime";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const AppointmentApproval = () => {
  const router = useRouter();

  const serverTime = useServerTime();

  const { data } = useQuery<GetTreatmentsAppointmentsResponse>(
    GetTreatmentsAppointments,
  );

  const activeTreatment = data?.myPatientProfile?.treatments?.find(
    (tr) => tr.status === "ACTIVE",
  );

  const proposedAppointment = data?.myPatientProfile?.appointments?.find(
    (ap) => ap.status === "PROPOSED" && ap.end > serverTime,
  );

  const handleAppointmentClick = () => {
    router.push("/consulta");
  };

  const handleInterruptClick = () => {
    router.push("/interromper");
  };

  if (!activeTreatment) {
    return null;
  }

  return (
    <>
      <Card>
        <Paragraph>
          Você está em tratamento com {activeTreatment.psychologist.likeName}.
        </Paragraph>
        <Paragraph>
          Você propôs uma próxima consulta para as{" "}
          {dayjs(1000 * proposedAppointment.start).format(
            "HH:mm [horas do dia ]DD/MM/YYYY",
          )}
          , que está sob análise. Assim que houver retorno do profissional, você
          será avisado.
        </Paragraph>
        <Paragraph>
          Caso o horário proposto não seja mais possível para você, clique no
          botão abaixo para remarcar a consulta.
        </Paragraph>
        <div className="button-wrapper">
          <Button block color="primary" onClick={handleAppointmentClick}>
            Escolher novo horário
          </Button>
        </div>
      </Card>
      <Card>
        <Paragraph>
          Caso você não esteja achando o atual tratamento proveitoso, você pode
          interrompê-lo clicando no botão abaixo.
        </Paragraph>
        <Paragraph>
          Saiba que não há nada de errado em não se identificar com um psicólogo
          em específico. O objetivo de todo tratamento é que você se sinta
          confortável. Você não ficará desamparado e poderá iniciar um
          tratamento com outro psicólogo do nosso projeto caso queira.
        </Paragraph>
        <div className="button-wrapper">
          <Button block color="secondary" onClick={handleInterruptClick}>
            Interromper tratamento
          </Button>
        </div>
      </Card>
      <style jsx>{`
        .button-wrapper {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default AppointmentApproval;