import { useRouter } from "next/router";

import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const AwaitingProfile = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/perfil");
  };

  return (
    <>
      <Card>
        <Paragraph>
          Para te indicarmos aos pacientes com maior compatibilidade, pedimos
          que antes você preencha o seu perfil. Esse preenchimento costuma
          demorar entre 5 e 10 minutos.
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
