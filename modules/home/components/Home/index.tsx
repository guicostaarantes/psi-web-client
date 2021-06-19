import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import PatientGreeting from "@psi/home/components/PatientGreeting";
import PatientStatus from "@psi/home/components/PatientStatus";
import PsychologistGreeting from "@psi/home/components/PsychologistGreeting";
import PsychologistTreatments from "@psi/home/components/PsychologistTreatments";

const Home = () => {
  const user = useCurrentUser();

  if (user.role === "PATIENT") {
    return (
      <>
        <PatientGreeting />
        <PatientStatus />
      </>
    );
  }

  if (user.role === "PSYCHOLOGIST") {
    return (
      <>
        <PsychologistGreeting />
        <PsychologistTreatments />
      </>
    );
  }

  return null;
};

export default Home;
