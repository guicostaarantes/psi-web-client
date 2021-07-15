import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { ValuesType } from "utility-types";

import { MyPatientAppointments } from "@psi/patientStart/components/Appointment/graphql";
import {
  InterruptTreatmentByPatient,
  InterruptTreatmentByPatientInput,
  MyPatientTreatments,
  MyPatientTreatmentsResponse,
} from "@psi/patientStart/components/Treatment/graphql";
import Button from "@psi/styleguide/components/Button";
import Modal from "@psi/styleguide/components/Modal";
import TextArea from "@psi/styleguide/components/TextArea";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface InterruptTreatmentModalProps {
  onClose: () => void;
  open: boolean;
  treatment: ValuesType<
    MyPatientTreatmentsResponse["myPatientProfile"]["treatments"]
  >;
}

const InterruptTreatmentModal = ({
  onClose,
  open,
  treatment,
}: InterruptTreatmentModalProps) => {
  const reason = useRef(null);

  const [interruptTreatment, { loading }] = useMutation<
    null,
    InterruptTreatmentByPatientInput
  >(InterruptTreatmentByPatient, {
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: MyPatientTreatments },
      { query: MyPatientAppointments },
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
