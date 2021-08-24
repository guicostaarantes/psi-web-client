import {
  MyPsychologistAppointmentsDocument,
  MyPsychologistTreatmentsDocument,
  useFinalizeTreatmentMutation,
} from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Modal from "@psi/styleguide/components/Modal";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface FinalizeTreatmentModalProps {
  onClose: () => void;
  open: boolean;
  patient: {
    fullName: string;
  };
  treatmentId: string;
}

const FinalizeTreatmentModal = ({
  onClose,
  open,
  patient,
  treatmentId,
}: FinalizeTreatmentModalProps) => {
  const [finalizeTreatment, { loading }] = useFinalizeTreatmentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: MyPsychologistTreatmentsDocument },
      { query: MyPsychologistAppointmentsDocument },
    ],
  });

  const handleFinalizeConfirmClick = async () => {
    await finalizeTreatment({
      variables: { id: treatmentId },
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Finalizar tratamento">
      <div className="wrapper">
        <Paragraph>
          Essa funcionalidade deve ser utilizada para terminar tratamentos onde
          o paciente terminou o tratamento com sucesso e não precisa mais do
          acompanhamento. Caso tenha havido algum imprevisto ou
          incompatibilidade com o paciente, cancele essa janela e use o botão
          &ldquo;Interromper&rdquo;.
        </Paragraph>
        <Paragraph>
          Essa ação é irreversível. Ao clicar no botão &ldquo;Finalizar
          tratamento&rdquo;, você estará finalizando o seu tratamento com:
        </Paragraph>
        <Paragraph center>{patient.fullName}</Paragraph>
        <div className="buttons">
          <Button
            color="primary"
            loading={loading}
            onClick={handleFinalizeConfirmClick}
          >
            Finalizar tratamento
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

export default FinalizeTreatmentModal;
