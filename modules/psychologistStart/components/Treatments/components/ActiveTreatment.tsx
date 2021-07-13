import { useState } from "@hookstate/core";

import FinalizeTreatmentModal from "@psi/psychologistStart/components/Treatments/components/FinalizeTreatmentModal";
import InterruptTreatmentModal from "@psi/psychologistStart/components/Treatments/components/InterruptTreatmentModal";
import formatWeeklyHour from "@psi/shared/utils/formatWeeklyHour";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";

interface ActiveTreatmentProps {
  id: string;
  weeklyStart: number;
  duration: number;
  price: number;
  patient: {
    fullName: string;
  };
}

const ActiveTreatment = ({
  id,
  weeklyStart,
  duration,
  price,
  patient,
}: ActiveTreatmentProps) => {
  const finalizeModalOpen = useState(false);

  const interruptModalOpen = useState(false);

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
            <div className="text">Paciente: {patient.fullName}</div>
            <div className="text">
              Horário das sessões: {formatWeeklyHour(weeklyStart)}
            </div>
            <div className="text">
              Duração de cada sessão: {durationInMinutes} minutos
            </div>
            <div>Valor cobrado por sessão: {priceInCurrency}</div>
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
