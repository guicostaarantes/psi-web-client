import { useState } from "@hookstate/core";

import TreatmentSelectionModal from "@psi/patientStart/components/Treatment/components/TreatmentSelectionModal";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const TreatmentSelection = () => {
  const selectTreatmentModalOpen = useState(false);

  return (
    <>
      <Card>
        <Paragraph>
          Você não está com nenhum tratamento atualmente. Utilize o nosso
          algoritmo para encontrar um psicólogo alinhado com suas
          características e preferências e iniciar um tratamento.
        </Paragraph>
        <div className="button-wrapper">
          <Button
            color="primary"
            onClick={() => selectTreatmentModalOpen.set(true)}
          >
            Encontrar um psicólogo
          </Button>
        </div>
      </Card>
      {selectTreatmentModalOpen.value ? (
        <TreatmentSelectionModal
          onClose={() => selectTreatmentModalOpen.set(false)}
          open={selectTreatmentModalOpen.value}
        />
      ) : null}
      <style jsx>{`
        .button-wrapper {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default TreatmentSelection;
