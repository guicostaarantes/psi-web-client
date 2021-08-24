import { useRef } from "react";

import {
  MyPsychologistAppointmentsDocument,
  MyPsychologistTreatmentsDocument,
  useInterruptTreatmentByPsychologistMutation,
} from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Modal from "@psi/styleguide/components/Modal";
import TextArea from "@psi/styleguide/components/TextArea";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface InterruptTreatmentModalProps {
  onClose: () => void;
  open: boolean;
  patient: {
    fullName: string;
  };
  treatmentId: string;
}

const InterruptTreatmentModal = ({
  onClose,
  open,
  patient,
  treatmentId,
}: InterruptTreatmentModalProps) => {
  const reason = useRef(null);

  const [
    interruptTreatment,
    { loading },
  ] = useInterruptTreatmentByPsychologistMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: MyPsychologistTreatmentsDocument },
      { query: MyPsychologistAppointmentsDocument },
    ],
  });

  const handleInterruptConfirmClick = async () => {
    await interruptTreatment({
      variables: { id: treatmentId, reason: reason.current.value },
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Interromper tratamento">
      <div className="wrapper">
        <Paragraph>
          Essa funcionalidade deve ser utilizada para terminar tratamentos onde
          houve algum imprevisto ou incompatibilidade com o paciente. Caso tudo
          tenha ido bem e você queira finalizar o tratamento pois o paciente já
          não precisa mais de acompanhamento, cancele essa janela e use o botão
          &ldquo;Finalizar&rdquo;.
        </Paragraph>
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
        <Paragraph center>{patient.fullName}</Paragraph>
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
