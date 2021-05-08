import { useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

import {
  GetOwnLikeName,
  GetOwnLikeNameResponse,
} from "@psi/home/components/Greeting/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Image from "@psi/styleguide/components/Image";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";

const Greeting = () => {
  const router = useRouter();

  const { data } = useQuery<GetOwnLikeNameResponse>(GetOwnLikeName);

  const likeName = useState("");

  useEffect(() => {
    if (data?.getOwnPatientProfile?.likeName) {
      likeName.set(data.getOwnPatientProfile.likeName);
    }
  }, [data]);

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
              <Image
                circle
                label={`Avatar de ${likeName.value}`}
                src="avatar.webp"
              />
            </div>
            <MediumTitle>Oi {likeName.value}</MediumTitle>
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
          gap: 1rem;
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

export default Greeting;
