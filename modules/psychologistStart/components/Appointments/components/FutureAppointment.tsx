import { useState } from "@hookstate/core";
import { format } from "date-fns";

import CancelAppointmentModal from "@psi/psychologistStart/components/Appointments/components/CancelAppointmentModal";
import EditAppointmentModal from "@psi/psychologistStart/components/Appointments/components/EditAppointmentModal";
import {
  AppointmentStatus,
  MyPsychologistAppointmentsDocument,
  useConfirmAppointmentByPsychologistMutation,
} from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import useToast from "@psi/styleguide/hooks/useToast";

interface FutureAppointmentProps {
  id: string;
  patientName: string;
  start: number;
  status: AppointmentStatus;
}

const FutureAppointment = ({
  id,
  patientName,
  start,
  status,
}: FutureAppointmentProps) => {
  const { addToast } = useToast();

  const editModalOpen = useState(false);

  const cancelModalOpen = useState(false);

  const [
    confirmAppointment,
    { loading },
  ] = useConfirmAppointmentByPsychologistMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPsychologistAppointmentsDocument }],
  });

  const handleConfirmClick = async () => {
    try {
      await confirmAppointment({ variables: { id } });
    } catch {
      addToast({
        header: "Erro no servidor",
        message:
          "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
      });
    }
  };

  const canConfirm = [
    "CREATED",
    "CONFIRMED_BY_PATIENT",
    "EDITED_BY_PATIENT",
  ].includes(status);

  const canEdit = ![
    "CANCELED_BY_PATIENT",
    "TREATMENT_INTERRUPTED_BY_PATIENT",
    "TREATMENT_INTERRUPTED_BY_PSYCHOLOGIST",
    "TREATMENT_FINALIZED",
  ].includes(status);

  const canCancel = ![
    "CANCELED_BY_PATIENT",
    "CANCELED_BY_PSYCHOLOGIST",
    "TREATMENT_INTERRUPTED_BY_PATIENT",
    "TREATMENT_INTERRUPTED_BY_PSYCHOLOGIST",
    "TREATMENT_FINALIZED",
  ].includes(status);

  const statusSentence =
    status === "CONFIRMED_BY_PSYCHOLOGIST"
      ? "Você confirmou a consulta. Aguardando confirmação do paciente."
      : status === "CONFIRMED_BY_PATIENT"
      ? "O paciente já confirmou a consulta."
      : status === "CONFIRMED_BY_BOTH"
      ? "Você e o paciente confirmaram a consulta."
      : status === "EDITED_BY_PSYCHOLOGIST"
      ? "Você sugeriu uma mudança na consulta."
      : status === "EDITED_BY_PATIENT"
      ? "O paciente sugeriu uma mudança na consulta."
      : status === "CANCELED_BY_PSYCHOLOGIST"
      ? "Você cancelou essa consulta."
      : status === "CANCELED_BY_PATIENT"
      ? "O paciente cancelou essa consulta."
      : status === "TREATMENT_INTERRUPTED_BY_PSYCHOLOGIST"
      ? "Consulta cancelada pois você interrompeu este tratamento."
      : status === "TREATMENT_INTERRUPTED_BY_PATIENT"
      ? "Consulta cancelada pois o paciente interrompeu este tratamento."
      : status === "TREATMENT_FINALIZED"
      ? "Consulta cancelada pois o tratamento foi finalizado."
      : "Consulta criada pelo sistema.";

  return (
    <>
      <Card floating>
        <div className="wrapper">
          <div>
            <div className="text">Paciente: {patientName}</div>
            <div className="text">
              Data: {format(1000 * start, "dd/MM/yyyy' às 'HH:mm")}
            </div>
            <div className="text">Status: {statusSentence}</div>
          </div>
          <div className="buttons">
            {canConfirm ? (
              <Button
                color="primary"
                loading={loading}
                onClick={handleConfirmClick}
              >
                Confirmar
              </Button>
            ) : null}
            {canEdit ? (
              <Button color="secondary" onClick={() => editModalOpen.set(true)}>
                Modificar
              </Button>
            ) : null}
            {canCancel ? (
              <Button
                color="secondary"
                onClick={() => cancelModalOpen.set(true)}
              >
                Cancelar
              </Button>
            ) : null}
          </div>
        </div>
      </Card>
      <EditAppointmentModal
        open={editModalOpen.value}
        onClose={() => editModalOpen.set(false)}
        appointmentId={id}
      />
      <CancelAppointmentModal
        open={cancelModalOpen.value}
        onClose={() => cancelModalOpen.set(false)}
        appointmentId={id}
      />
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

export default FutureAppointment;
