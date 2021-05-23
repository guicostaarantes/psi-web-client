import { useMutation } from "@apollo/client";

import {
  FinalizeTreatment,
  FinalizeTreatmentInput,
  InterruptTreatment,
  InterruptTreatmentInput,
  MyPsychologistTreatments,
} from "@psi/home/components/PsychologistTreatments/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";

interface ActiveTreatmentProps {
  id: string;
  duration: number;
  price: number;
  interval: number;
  patient: {
    fullName: string;
  };
}

const ActiveTreatment = ({
  id,
  duration,
  price,
  interval,
  patient,
}: ActiveTreatmentProps) => {
  const [finalizeTreatment] = useMutation<null, FinalizeTreatmentInput>(
    FinalizeTreatment,
    {
      refetchQueries: [{ query: MyPsychologistTreatments }],
    },
  );

  const [interruptTreatment] = useMutation<null, InterruptTreatmentInput>(
    InterruptTreatment,
    {
      refetchQueries: [{ query: MyPsychologistTreatments }],
    },
  );

  const handleFinalizeClick = () => {
    finalizeTreatment({ variables: { id } });
  };

  const handleInterruptClick = () => {
    interruptTreatment({ variables: { id, reason: "" } });
  };

  const durationInMinutes = Math.floor(duration / 60);

  const intervalInDays = Math.floor(interval / 86400);

  const priceInCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return (
    <>
      <Card floating>
        <div className="wrapper">
          <div>
            <div className="text">{patient.fullName}</div>
            <div className="text">
              {durationInMinutes} minutos por sessão | Sessões a cada{" "}
              {intervalInDays} dias | {priceInCurrency} por sessão
            </div>
          </div>
          <div className="buttons">
            <Button color="primary" onClick={handleFinalizeClick}>
              Finalizar
            </Button>
            <Button color="secondary" onClick={handleInterruptClick}>
              Interromper
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

export default ActiveTreatment;
