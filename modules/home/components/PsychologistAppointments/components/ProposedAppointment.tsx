import { useMutation } from "@apollo/client";
import dayjs from "dayjs";

import {
  ConfirmAppointment,
  ConfirmAppointmentInput,
  DenyAppointment,
  DenyAppointmentInput,
  MyPsychologistAppointments,
} from "@psi/home/components/PsychologistAppointments/graphql";
import Button from "@psi/styleguide/components/Button";

interface ProposedAppointmentProps {
  id: string;
  start: number;
  end: number;
  patient: {
    fullName: string;
  };
}

const ProposedAppointment = ({
  id,
  start,
  end,
  patient,
}: ProposedAppointmentProps) => {
  const [confirmAppointment] = useMutation<null, ConfirmAppointmentInput>(
    ConfirmAppointment,
    {
      refetchQueries: [{ query: MyPsychologistAppointments }],
    },
  );

  const [denyAppointment] = useMutation<null, DenyAppointmentInput>(
    DenyAppointment,
    {
      refetchQueries: [{ query: MyPsychologistAppointments }],
    },
  );

  const handleConfirmClick = () => {
    confirmAppointment({ variables: { id } });
  };

  const handleDenyClick = () => {
    denyAppointment({ variables: { id, reason: "" } });
  };

  return (
    <>
      <div className="wrapper">
        <div>
          <div className="text">{patient.fullName}</div>
          <div className="text">
            {dayjs(1000 * start).format("DD/MM/YYYY[, das ]HH:mm")}
            {dayjs(1000 * end).format("[ às ]HH:mm")}
          </div>
        </div>
        <div className="buttons">
          <Button color="primary" onClick={handleConfirmClick}>
            Confirmar
          </Button>
          <Button color="secondary" onClick={handleDenyClick}>
            Declinar
          </Button>
        </div>
      </div>
      <style jsx>{`
        .buttons {
          align-items: center;
          display: flex;
          gap: 0.5rem;
        }
        .text {
          margin-bottom: 0.5rem;
          margin-top: 0.5rem;
        }
        .wrapper {
          border: 1px solid black;
          border-radius: 0.5rem;
          display: flex;
          justify-content: space-between;
          margin: 0.5rem;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default ProposedAppointment;
