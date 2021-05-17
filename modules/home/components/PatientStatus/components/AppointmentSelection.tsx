import { useRouter } from "next/router";
import { useState } from "react";

import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const AppointmentSelection = () => {
  const router = useRouter();

  const name = useState("TODO");

  const handleAppointmentClick = () => {
    router.push("/consulta");
  };

  const handleInterruptClick = () => {
    router.push("/interromper");
  };

  return (
    <>
      <Card>
        <Paragraph>Você está em tratamento com {name}.</Paragraph>
        <Paragraph>
          Agora é necessário marcar sua próxima consulta. Clique no botão abaixo
          para ver a agenda com os horários disponíveis e escolher o mais
          conveniente para você.
        </Paragraph>
        <div className="button-wrapper">
          <Button block color="primary" onClick={handleAppointmentClick}>
            Marcar próxima consulta
          </Button>
        </div>
      </Card>
      <Card>
        <Paragraph>
          Caso você não esteja achando o atual tratamento proveitoso, você pode
          interrompê-lo clicando no botão abaixo.
        </Paragraph>
        <Paragraph>
          Saiba que não há nada de errado em não se identificar com um psicólogo
          em específico. O objetivo de todo tratamento é que você se sinta
          confortável. Você não ficará desamparado e poderá iniciar um
          tratamento com outro psicólogo do nosso projeto caso queira.
        </Paragraph>
        <div className="button-wrapper">
          <Button block color="secondary" onClick={handleInterruptClick}>
            Interromper tratamento
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

export default AppointmentSelection;