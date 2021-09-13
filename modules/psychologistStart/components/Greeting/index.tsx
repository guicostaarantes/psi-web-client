import { useRouter } from "next/router";

import { useMyPsychologistGreetingQuery } from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Image from "@psi/styleguide/components/Image";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";

const PsychologistGreeting = () => {
  const router = useRouter();

  const { data } = useMyPsychologistGreetingQuery();

  const likeName = data?.myPsychologistProfile?.likeName;
  const avatar = data?.myPsychologistProfile?.avatar;

  const handleMyProfileClick = () => {
    router.push("/perfil");
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
              <Image
                circle
                label={`Avatar de ${likeName}`}
                authSrc={
                  avatar
                    ? `${process.env.NEXT_PUBLIC_PSI_STATIC_URI}/${avatar}`
                    : ""
                }
                src="avatar.webp"
              />
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

export default PsychologistGreeting;
