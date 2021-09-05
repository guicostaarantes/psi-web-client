import DeletePendingTreatmentButton from "@psi/psychologistStart/components/Treatments/components/DeletePendingTreatmentButton";
import formatHourFromFrequencyAndPhase from "@psi/shared/utils/formatHourFromFrequencyAndPhase";
import Card from "@psi/styleguide/components/Card";

interface PendingTreatmentProps {
  id: string;
  frequency: number;
  phase: number;
  duration: number;
}

const PendingTreatment = ({
  id,
  frequency,
  phase,
  duration,
}: PendingTreatmentProps) => {
  const durationInMinutes = Math.floor(duration / 60);

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
          </div>
          <div className="buttons">
            <DeletePendingTreatmentButton treatmentId={id} />
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
