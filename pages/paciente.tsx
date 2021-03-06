import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import PatientDataComponent from "@psi/profiles/components/PatientData";
import Container from "@psi/styleguide/components/Layout/Container";

const PatientPage = () => {
  useCurrentUser(true);

  return (
    <Container>
      <PatientDataComponent />
    </Container>
  );
};

export default PatientPage;
