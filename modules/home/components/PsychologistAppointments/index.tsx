import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import ConfirmedAppointment from "@psi/home/components/PsychologistAppointments/components/ConfirmedAppointment";
import ProposedAppointment from "@psi/home/components/PsychologistAppointments/components/ProposedAppointment";
import {
  MyPsychologistAppointments,
  MyPsychologistAppointmentsResponse,
} from "@psi/home/components/PsychologistAppointments/graphql";
import useServerTime from "@psi/shared/hooks/useServerTime";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const PsychologistAppointments = () => {
  const serverTime = useServerTime();

  const router = useRouter();

  const { data } = useQuery<MyPsychologistAppointmentsResponse>(
    MyPsychologistAppointments,
  );

  const proposedAppointments = data?.myPsychologistProfile?.appointments
    .filter((ap) => ap.status === "PROPOSED" && ap.end > serverTime)
    .sort((ap1, ap2) => (ap1.start < ap2.start ? -1 : 1));

  const confirmedAppointments = data?.myPsychologistProfile?.appointments
    .filter((ap) => ap.status === "CONFIRMED" && ap.end > serverTime)
    .sort((ap1, ap2) => (ap1.start < ap2.start ? -1 : 1));

  const handleScheduleClick = () => {
    router.push("/agenda");
  };

  return (
    <>
      <Card>
        {proposedAppointments?.length ? (
          <>
            <Paragraph>
              Esses horários foram propostos por pacientes e aguardam sua
              aprovação:
            </Paragraph>
            {proposedAppointments.map((ap) => (
              <ProposedAppointment
                key={ap.id}
                id={ap.id}
                start={ap.start}
                end={ap.end}
                patient={ap.patient}
              />
            ))}
          </>
        ) : null}
        {confirmedAppointments?.length ? (
          <>
            <Paragraph>Essas são as suas próximas consultas:</Paragraph>
            {confirmedAppointments.map((ap) => (
              <ConfirmedAppointment
                key={ap.id}
                id={ap.id}
                start={ap.start}
                end={ap.end}
                patient={ap.patient}
              />
            ))}
          </>
        ) : null}
        {!proposedAppointments?.length && !confirmedAppointments?.length ? (
          <Paragraph>Você não tem nenhuma consulta marcada.</Paragraph>
        ) : null}
        <div className="button-wrapper">
          <Button color="primary" onClick={handleScheduleClick}>
            Visualizar minha agenda
          </Button>
        </div>
      </Card>
      <style jsx>{`
        .button-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
};

export default PsychologistAppointments;
