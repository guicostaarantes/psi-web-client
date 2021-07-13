import { useQuery } from "@apollo/client";

import FutureAppointment from "@psi/psychologistStart/components/Appointments/components/FutureAppointment";
import {
  MyPsychologistAppointments,
  MyPsychologistAppointmentsResponse,
} from "@psi/psychologistStart/components/Appointments/graphql";
import Empty from "@psi/shared/components/Empty";
import useServerTime from "@psi/shared/hooks/useServerTime";
import Card from "@psi/styleguide/components/Card";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";

const Appointments = () => {
  const serverTime = useServerTime();

  const { loading, data } = useQuery<MyPsychologistAppointmentsResponse>(
    MyPsychologistAppointments,
  );

  if (loading) return null;

  const appointments = data?.myPsychologistProfile?.appointments;

  const sortedAppointments = [...appointments]
    .filter((ap) => ap.end > serverTime)
    .sort((a, b) => (a.start < b.start ? -1 : 1));

  if (!sortedAppointments?.length) return <Empty />;

  return (
    <>
      <Card>
        <MediumTitle center>Próximas consultas</MediumTitle>
        {sortedAppointments.map((ap) => (
          <FutureAppointment
            key={ap.id}
            id={ap.id}
            patientName={ap.treatment.patient.fullName}
            start={ap.start}
            status={ap.status}
          />
        ))}
      </Card>
      <style jsx>{`
        .text {
          margin-bottom: 0.5rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default Appointments;
