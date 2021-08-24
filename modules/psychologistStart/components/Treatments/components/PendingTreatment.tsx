import {
  MyPsychologistTreatmentsDocument,
  useDeleteTreatmentMutation,
} from "@psi/shared/graphql";
import formatHourFromFrequencyAndPhase from "@psi/shared/utils/formatHourFromFrequencyAndPhase";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";

interface PendingTreatmentProps {
  id: string;
  frequency: number;
  phase: number;
  duration: number;
  price: number;
}

const PendingTreatment = ({
  id,
  frequency,
  phase,
  duration,
  price,
}: PendingTreatmentProps) => {
  const [deleteTreatment, { loading }] = useDeleteTreatmentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPsychologistTreatmentsDocument }],
  });

  const handleDeleteClick = () => {
    deleteTreatment({ variables: { id } });
  };

  const durationInMinutes = Math.floor(duration / 60);

  const priceInCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return (
    <>
      <Card floating>
        <div className="wrapper">
          <div>
            <div className="text">
              Horário das sessões:{" "}
              {formatHourFromFrequencyAndPhase(frequency, phase)}
            </div>
            <div className="text">
              Duração de cada sessão: {durationInMinutes} minutos
            </div>
            <div>Valor cobrado por sessão: {priceInCurrency}</div>
          </div>
          <div className="buttons">
            <Button
              color="secondary"
              loading={loading}
              onClick={handleDeleteClick}
            >
              Excluir
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

export default PendingTreatment;
