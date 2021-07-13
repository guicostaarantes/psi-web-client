import { useRouter } from "next/router";

import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const TreatmentSelection = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/tratamento");
  };

  return (
    <>
      <Card>
        <Paragraph>
          Você não está com nenhum tratamento atualmente. Utilize o nosso
          algoritmo para encontrar um psicólogo alinhado com suas
          características e preferências e iniciar um tratamento.
        </Paragraph>
        <div className="button-wrapper">
          <Button block color="primary" onClick={handleClick}>
            Encontrar um psicólogo
          </Button>
        </div>
      </Card>
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
