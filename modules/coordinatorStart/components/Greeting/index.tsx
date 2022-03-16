import { useRouter } from "next/router";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";

const CoordinatorGreeting = () => {
  const router = useRouter();

  const user = useCurrentUser();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <Card>
        <div className="content">
          <div className="greeting-content">
            <MediumTitle>Painel do coordenador [{user.email}]</MediumTitle>
          </div>
          <div className="actions-content">
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
      `}</style>
    </>
  );
};

export default CoordinatorGreeting;
