import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import PatientGreeting from "@psi/home/components/PatientGreeting";
import PatientStatus from "@psi/home/components/PatientStatus";
import PsychologistAppointments from "@psi/home/components/PsychologistAppointments";
import PsychologistGreeting from "@psi/home/components/PsychologistGreeting";

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
        <PsychologistAppointments />
      </>
    );
  }

  return null;
};

export default Home;
