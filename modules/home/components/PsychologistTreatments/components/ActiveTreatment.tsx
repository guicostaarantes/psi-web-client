import { useState } from "@hookstate/core";

import FinalizeTreatmentModal from "@psi/home/components/PsychologistTreatments/components/FinalizeTreatmentModal";
import InterruptTreatmentModal from "@psi/home/components/PsychologistTreatments/components/InterruptTreatmentModal";
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
  const finalizeModalOpen = useState(false);

  const interruptModalOpen = useState(false);

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
            <Button color="primary" onClick={() => finalizeModalOpen.set(true)}>
              Finalizar
            </Button>
            <Button
              color="secondary"
              onClick={() => interruptModalOpen.set(true)}
            >
              Interromper
            </Button>
          </div>
        </div>
      </Card>
      <FinalizeTreatmentModal
        onClose={() => finalizeModalOpen.set(false)}
        open={finalizeModalOpen.value}
        treatmentId={id}
        patient={patient}
      />
      <InterruptTreatmentModal
        onClose={() => interruptModalOpen.set(false)}
        open={interruptModalOpen.value}
        treatmentId={id}
        patient={patient}
      />
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
