import PatientDataComponent from "@src/components/PatientData";
import useCurrentUser from "@src/hooks/useCurrentUser";
import Container from "@src/styleguide/Layout/Container";
import BigTitle from "@src/styleguide/Typography/BigTitle";

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
