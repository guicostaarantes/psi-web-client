import { useRef } from "react";

import {
  MyPatientAppointmentsDocument,
  useCancelAppointmentByPatientMutation,
} from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Modal from "@psi/styleguide/components/Modal";
import TextArea from "@psi/styleguide/components/TextArea";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface CancelAppointmentModalProps {
  onClose: () => void;
  open: boolean;
  appointmentId: string;
}

const CancelAppointmentModal = ({
  onClose,
  open,
  appointmentId,
}: CancelAppointmentModalProps) => {
  const reason = useRef(null);

  const [
    cancelAppointment,
    { loading },
  ] = useCancelAppointmentByPatientMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPatientAppointmentsDocument }],
  });

  const handleCancelClick = async () => {
    await cancelAppointment({
      variables: {
        id: appointmentId,
        reason: reason.current.value,
      },
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Sugerir mudança na consulta">
      <div className="wrapper">
        <Paragraph>
          Você está cancelando a próxima consulta. Opcionalmente, adicione um
          motivo para o cancelamento. O seu psicólogo será notificado que você
          não poderá comparecer.
        </Paragraph>
        <TextArea
          name="reason"
          label="Motivo para cancelamento"
          reference={reason}
        />
        <div className="buttons">
          <Button color="primary" loading={loading} onClick={handleCancelClick}>
            Cancelar consulta
          </Button>
          <Button color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
      <style jsx>{`
        .buttons {
          align-items: center;
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
        }
        .wrapper {
          max-width: 100%;
          width: 30rem;
        }
      `}</style>
    </Modal>
  );
};

export default CancelAppointmentModal;
