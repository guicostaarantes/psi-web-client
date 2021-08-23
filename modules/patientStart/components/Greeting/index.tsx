import { useRouter } from "next/router";

import { useMyPatientLikeNameQuery } from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Image from "@psi/styleguide/components/Image";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";

const PatientGreeting = () => {
  const router = useRouter();

  const { data } = useMyPatientLikeNameQuery();

  const likeName = data?.myPatientProfile?.likeName;

  const handleMyProfileClick = () => {
    router.push("/paciente");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <Card>
        <div className="content">
          <div className="greeting-content">
            <div className="image-wrapper">
              <Image circle label={`Avatar de ${likeName}`} src="avatar.webp" />
            </div>
            <MediumTitle>Oi {likeName}</MediumTitle>
          </div>
          <div className="actions-content">
            <Button onClick={handleMyProfileClick}>Meu perfil</Button>
            <Button onClick={handleLogoutClick}>Sair</Button>
          </div>
        </div>
      </Card>
      <style jsx>{`
        .actions-content {
          align-items: center;
          display: flex;
          gap: 0.5rem;
        }
        .content {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }
        .greeting-content {
          align-items: center;
          display: flex;
          gap: 1rem;
        }
        .image-wrapper {
          height: 5rem;
          width: 5rem;
        }
      `}</style>
    </>
  );
};

export default PatientGreeting;
