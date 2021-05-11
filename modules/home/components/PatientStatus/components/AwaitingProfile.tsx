import { useRouter } from "next/router";

import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const AwaitingProfile = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/paciente");
  };

  return (
    <>
      <Card>
        <Paragraph>
          Para encontrarmos os psicólogos com maior compatibilidade, pedimos que
          antes você preencha o seu perfil. Esse preenchimento costuma demorar
          entre 5 e 10 minutos.
        </Paragraph>
        <Paragraph>
          No preenchimento do perfil, será pedido que você coloque informações
          pessoais, e também algumas preferências quanto ao profissional que vai
          te atender. Esses dados são totalmente confidenciais e nem mesmo os
          psicólogos ou coordenadores da plataforma têm acesso a eles.
        </Paragraph>
        <div className="button-wrapper">
          <Button block color="primary" onClick={handleClick}>
            Preencher meu perfil
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

export default AwaitingProfile;
