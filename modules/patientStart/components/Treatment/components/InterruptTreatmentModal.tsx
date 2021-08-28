import { useRef } from "react";
import { DeepPartial } from "utility-types";

import {
  MyPatientAppointmentsDocument,
  MyPatientTreatmentsDocument,
  PatientTreatment,
  useInterruptTreatmentByPatientMutation,
} from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Modal from "@psi/styleguide/components/Modal";
import TextArea from "@psi/styleguide/components/TextArea";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface InterruptTreatmentModalProps {
  onClose: () => void;
  open: boolean;
  treatment: DeepPartial<PatientTreatment>;
}

const InterruptTreatmentModal = ({
  onClose,
  open,
  treatment,
}: InterruptTreatmentModalProps) => {
  const reason = useRef(null);

  const [
    interruptTreatment,
    { loading },
  ] = useInterruptTreatmentByPatientMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: MyPatientTreatmentsDocument },
      { query: MyPatientAppointmentsDocument },
    ],
  });

  const handleInterruptConfirmClick = async () => {
    await interruptTreatment({
      variables: { id: treatment.id, reason: reason.current.value },
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Interromper tratamento">
      <div className="wrapper">
        <Paragraph>
          Opcional: escreva no campo abaixo o motivo para a interrupção do
          tratamento. Essa informação será compartilhada com os coordenadores do
          projeto, mas não com o paciente.
        </Paragraph>
        <TextArea
          name="reason"
          label="Motivo para interrupção"
          reference={reason}
        />
        <Paragraph>
          Essa ação é irreversível. Ao clicar no botão &ldquo;Interromper
          tratamento&rdquo;, você estará interrompendo o seu tratamento com:
        </Paragraph>
        <Paragraph center>{treatment.psychologist.likeName}</Paragraph>
        <div className="buttons">
          <Button
            color="primary"
            loading={loading}
            onClick={handleInterruptConfirmClick}
          >
            Interromper tratamento
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

export default InterruptTreatmentModal;
