import useCurrentUser from "@src/modules/auth/hooks/useCurrentUser";
import PatientDataComponent from "@src/modules/profiles/components/PatientData";
import Container from "@src/modules/styleguide/components/Layout/Container";
import BigTitle from "@src/modules/styleguide/components/Typography/BigTitle";

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
