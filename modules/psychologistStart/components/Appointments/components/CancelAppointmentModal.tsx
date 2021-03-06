import { useMutation } from "@apollo/client";
import { useRef } from "react";

import {
  CancelAppointmentByPsychologist,
  CancelAppointmentByPsychologistInput,
  MyPsychologistAppointments,
} from "@psi/psychologistStart/components/Appointments/graphql";
import Button from "@psi/styleguide/components/Button";
import Modal from "@psi/styleguide/components/Modal";
import TextArea from "@psi/styleguide/components/TextArea";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface EditAppointmentModalProps {
  onClose: () => void;
  open: boolean;
  appointmentId: string;
}

const CancelAppointmentModal = ({
  onClose,
  open,
  appointmentId,
}: EditAppointmentModalProps) => {
  const reason = useRef(null);

  const [cancelAppointment, { loading }] = useMutation<
    null,
    CancelAppointmentByPsychologistInput
  >(CancelAppointmentByPsychologist, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPsychologistAppointments }],
  });

  const handleEditClick = async () => {
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
          motivo para o cancelamento. O seu paciente será notificado que você
          não poderá comparecer.
        </Paragraph>
        <TextArea
          name="reason"
          label="Motivo para cancelamento"
          reference={reason}
        />
        <div className="buttons">
          <Button color="primary" loading={loading} onClick={handleEditClick}>
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
