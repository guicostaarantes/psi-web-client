import { useMutation } from "@apollo/client";

import {
  DeleteTreatment,
  DeleteTreatmentInput,
  MyPsychologistTreatments,
} from "@psi/psychologistStart/components/Treatments/graphql";
import formatWeeklyHour from "@psi/shared/utils/formatWeeklyHour";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";

interface PendingTreatmentProps {
  id: string;
  weeklyStart: number;
  duration: number;
  price: number;
}

const PendingTreatment = ({
  id,
  weeklyStart,
  duration,
  price,
}: PendingTreatmentProps) => {
  const [deleteTreatment, { loading }] = useMutation<
    null,
    DeleteTreatmentInput
  >(DeleteTreatment, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPsychologistTreatments }],
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
              Horário das sessões: {formatWeeklyHour(weeklyStart)}
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
