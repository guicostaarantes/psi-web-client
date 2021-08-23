import { useState } from "@hookstate/core";
import { format } from "date-fns";

import CancelAppointmentModal from "@psi/patientStart/components/Appointment/components/CancelAppointmentModal";
import EditAppointmentModal from "@psi/patientStart/components/Appointment/components/EditAppointmentModal";
import NoFutureAppointments from "@psi/patientStart/components/Appointment/components/NoFutureAppointments";
import Empty from "@psi/shared/components/Empty";
import {
  MyPatientAppointmentsDocument,
  useConfirmAppointmentByPatientMutation,
  useMyPatientAppointmentsQuery,
} from "@psi/shared/graphql";
import useServerTime from "@psi/shared/hooks/useServerTime";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
import useToast from "@psi/styleguide/hooks/useToast";

const Appointment = () => {
  const serverTime = useServerTime();

  const { addToast } = useToast();

  const editModalOpen = useState(false);

  const cancelModalOpen = useState(false);

  const { loading, data } = useMyPatientAppointmentsQuery();

  const [
    confirmAppointment,
    { loading: confirmLoading },
  ] = useConfirmAppointmentByPatientMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPatientAppointmentsDocument }],
  });

  const handleConfirmClick = async () => {
    try {
      await confirmAppointment({ variables: { id: futureAppointment.id } });
    } catch {
      addToast({
        header: "Erro no servidor",
        message:
          "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
      });
    }
  };

  if (loading) return null;

  const futureAppointment = data?.myPatientProfile?.appointments?.find(
    (a) => a.end > serverTime,
  );

  if (!futureAppointment) return <NoFutureAppointments />;

  const psyName = futureAppointment.treatment?.psychologist?.likeName;
  const status = futureAppointment.status;

  if (
    [
      "TREATMENT_INTERRUPTED_BY_PATIENT",
      "TREATMENT_INTERRUPTED_BY_PSYCHOLOGIST",
      "TREATMENT_FINALIZED",
    ].includes(status)
  ) {
    return <Empty />;
  }

  const canConfirm = [
    "CREATED",
    "CONFIRMED_BY_PSYCHOLOGIST",
    "EDITED_BY_PSYCHOLOGIST",
  ].includes(status);

  const canEdit = status !== "CANCELED_BY_PSYCHOLOGIST";

  const canCancel = ![
    "CANCELED_BY_PSYCHOLOGIST",
    "CANCELED_BY_PATIENT",
  ].includes(status);

  const statusSentence =
    status === "CONFIRMED_BY_PSYCHOLOGIST"
      ? `${psyName} já confirmou a consulta.`
      : status === "CONFIRMED_BY_PATIENT"
      ? `Você confirmou a consulta. Aguardando confirmação de ${psyName}.`
      : status === "CONFIRMED_BY_BOTH"
      ? `Você e ${psyName} confirmaram a consulta.`
      : status === "EDITED_BY_PSYCHOLOGIST"
      ? `${psyName} sugeriu uma mudança na consulta.`
      : status === "EDITED_BY_PATIENT"
      ? `Você sugeriu uma mudança na consulta.`
      : status === "CANCELED_BY_PSYCHOLOGIST"
      ? `${psyName} cancelou essa consulta.`
      : status === "CANCELED_BY_PATIENT"
      ? `Você cancelou essa consulta.`
      : null;

  return (
    <>
      <Card>
        <Paragraph center>Sua próxima consulta com {psyName}</Paragraph>
        <Paragraph center>
          {format(
            1000 * futureAppointment.start,
            "'Dia 'dd/MM/yyyy' às 'HH:mm",
          )}
        </Paragraph>
        {statusSentence ? <Paragraph center>{statusSentence}</Paragraph> : null}
        <div className="button-wrapper">
          {canConfirm ? (
            <Button
              loading={confirmLoading}
              color="primary"
              onClick={handleConfirmClick}
            >
              Confirmar
            </Button>
          ) : null}
          {canEdit ? (
            <Button color="secondary" onClick={() => editModalOpen.set(true)}>
              Sugerir novo horário
            </Button>
          ) : null}
          {canCancel ? (
            <Button color="secondary" onClick={() => cancelModalOpen.set(true)}>
              Cancelar consulta
            </Button>
          ) : null}
        </div>
      </Card>
      <EditAppointmentModal
        open={editModalOpen.value}
        onClose={() => editModalOpen.set(false)}
        appointmentId={futureAppointment.id}
      />
      <CancelAppointmentModal
        open={cancelModalOpen.value}
        onClose={() => cancelModalOpen.set(false)}
        appointmentId={futureAppointment.id}
      />
      <style jsx>{`
        .button-wrapper {
          display: flex;
          justify-content: center;
          gap: 1em;
        }
      `}</style>
    </>
  );
};

export default Appointment;
