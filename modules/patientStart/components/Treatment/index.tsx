import AwaitingProfile from "@psi/patientStart/components/Treatment/components/AwaitingProfile";
import InterruptTreatment from "@psi/patientStart/components/Treatment/components/InterruptTreatment";
import TreatmentSelection from "@psi/patientStart/components/Treatment/components/TreatmentSelection";
import { useMyPatientTreatmentsQuery } from "@psi/shared/graphql";

const Treatment = () => {
  const { loading, data } = useMyPatientTreatmentsQuery();

  if (loading) return null;

  const likeName = data?.myPatientProfile?.likeName;

  if (!likeName) return <AwaitingProfile />;

  const activeTreatment = data.myPatientProfile?.treatments?.find(
    (tr) => tr.status === "ACTIVE",
  );

  if (!activeTreatment) return <TreatmentSelection />;

  return <InterruptTreatment treatment={activeTreatment} />;
};

export default Treatment;
