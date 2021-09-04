import { useState } from "@hookstate/core";

import FinalizeTreatmentModal from "@psi/psychologistStart/components/Treatments/components/FinalizeTreatmentModal";
import InterruptTreatmentModal from "@psi/psychologistStart/components/Treatments/components/InterruptTreatmentModal";
import { TreatmentPriceRange } from "@psi/shared/graphql";
import formatHourFromFrequencyAndPhase from "@psi/shared/utils/formatHourFromFrequencyAndPhase";
import formatValueRange from "@psi/shared/utils/formatValueRange";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";

interface ActiveTreatmentProps {
  id: string;
  frequency: number;
  phase: number;
  duration: number;
  priceRange: Partial<TreatmentPriceRange>;
  patient: {
    fullName: string;
  };
}

const ActiveTreatment = ({
  id,
  frequency,
  phase,
  duration,
  priceRange,
  patient,
}: ActiveTreatmentProps) => {
  const finalizeModalOpen = useState(false);

  const interruptModalOpen = useState(false);

  const durationInMinutes = Math.floor(duration / 60);

  return (
    <>
      <Card floating>
        <div className="wrapper">
          <div>
            <div className="text">Paciente: {patient.fullName}</div>
            <div className="text">
              Horário das sessões:{" "}
              {formatHourFromFrequencyAndPhase(frequency, phase)}
            </div>
            <div className="text">
              Duração de cada sessão: {durationInMinutes} minutos
            </div>
            <div>
              Valor cobrado por sessão:{" "}
              {formatValueRange(
                priceRange.minimumPrice,
                priceRange.maximumPrice,
              )}
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
