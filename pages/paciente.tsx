import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import PatientDataComponent from "@psi/profiles/components/PatientData";
import Container from "@psi/styleguide/components/Layout/Container";
import BigTitle from "@psi/styleguide/components/Typography/BigTitle";

const PatientPage = () => {
  useCurrentUser(true);

  return (
    <Container>
      <BigTitle center>Atualização do perfil do paciente</BigTitle>
      <PatientDataComponent />
    </Container>
  );
};

export default PatientPage;
