import { useState } from "@hookstate/core";

import InterruptTreatmentModal from "@psi/patientStart/components/Treatment/components/InterruptTreatmentModal";
import { PatientTreatment } from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface InterruptTreatmentProps {
  treatment: PatientTreatment;
}

const InterruptTreatment = ({ treatment }: InterruptTreatmentProps) => {
  const interruptModalOpen = useState(false);

  return (
    <>
      <Card>
        <Paragraph>
          Caso você não esteja achando o atual tratamento proveitoso, você pode
          interrompê-lo clicando no botão abaixo.
        </Paragraph>
        <div className="button-wrapper">
          <Button color="primary" onClick={() => interruptModalOpen.set(true)}>
            Interromper tratamento
          </Button>
        </div>
        <Paragraph>
          Saiba que não há nada de errado em não se identificar com um psicólogo
          em específico. O objetivo de todo tratamento é que você se sinta
          confortável. Você não ficará desamparado e poderá iniciar um
          tratamento com outro psicólogo do nosso projeto caso seja do seu
          interesse.
        </Paragraph>
      </Card>
      <InterruptTreatmentModal
        onClose={() => interruptModalOpen.set(false)}
        open={interruptModalOpen.value}
        treatment={treatment}
      />
      <style jsx>{`
        .button-wrapper {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default InterruptTreatment;
