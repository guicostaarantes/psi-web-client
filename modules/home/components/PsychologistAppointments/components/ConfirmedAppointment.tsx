import { useMutation } from "@apollo/client";
import dayjs from "dayjs";

import {
  CancelAppointment,
  CancelAppointmentInput,
  MyPsychologistAppointments,
} from "@psi/home/components/PsychologistAppointments/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";

interface ConfirmedAppointmentProps {
  id: string;
  start: number;
  end: number;
  patient: {
    fullName: string;
  };
}

const ConfirmedAppointment = ({
  id,
  start,
  end,
  patient,
}: ConfirmedAppointmentProps) => {
  const [cancelAppointment] = useMutation<null, CancelAppointmentInput>(
    CancelAppointment,
    {
      refetchQueries: [{ query: MyPsychologistAppointments }],
    },
  );

  const handleCancelClick = () => {
    cancelAppointment({ variables: { id, reason: "" } });
  };

  return (
    <>
      <Card floating>
        <div className="wrapper">
          <div>
            <div className="text">{patient.fullName}</div>
            <div className="text">
              {dayjs(1000 * start).format("DD/MM/YYYY[, das ]HH:mm")}
              {dayjs(1000 * end).format("[ às ]HH:mm")}
            </div>
          </div>
          <div className="buttons">
            <Button color="secondary" onClick={handleCancelClick}>
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
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
          align-items: center;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

export default ConfirmedAppointment;
