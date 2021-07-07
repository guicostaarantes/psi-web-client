import { useQuery } from "@apollo/client";

import {
  MyPatientTreatments,
  MyPatientTreatmentsResponse,
} from "@psi/patientStart/components/Appointment/graphql";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const NoFutureAppointments = () => {
  const { data } = useQuery<MyPatientTreatmentsResponse>(MyPatientTreatments);

  const activeTreatment = data?.myPatientProfile?.treatments?.find(
    (tr) => tr.status === "ACTIVE",
  );

  if (!activeTreatment) return null;

  return (
    <Card>
      <Paragraph>
        Você está em tratamento com {activeTreatment?.psychologist?.likeName}
      </Paragraph>
      <Paragraph>
        Em breve o sistema irá agendar uma nova consulta baseada no horário
        semanal definido para o seu tratamento. Você também receberá os detalhes
        por email quando essa consulta for marcada.
      </Paragraph>
    </Card>
  );
};

export default NoFutureAppointments;
