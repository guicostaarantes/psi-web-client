import { useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import { useEffect } from "react";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import AppointmentReady from "@psi/home/components/PatientStatus/components/AppointmentReady";
import AwaitingAppointment from "@psi/home/components/PatientStatus/components/AwaitingAppointment";
import AwaitingProfile from "@psi/home/components/PatientStatus/components/AwaitingProfile";
import TreatmentSelection from "@psi/home/components/PatientStatus/components/TreatmentSelection";
import {
  GetTreatmentsAppointments,
  GetTreatmentsAppointmentsResponse,
} from "@psi/home/components/PatientStatus/graphql";
import useServerTime from "@psi/shared/hooks/useServerTime";
import assertUnreachable from "@psi/shared/utils/assertNeverType";

type StatusType =
  | "HIDDEN"
  | "AWAITING_PROFILE"
  | "TREATMENT_SELECTION"
  | "AWAITING_APPOINTMENT"
  | "APPOINTMENT_READY";

const PatientStatus = () => {
  const user = useCurrentUser();

  const serverTime = useServerTime();

  const { data } = useQuery<GetTreatmentsAppointmentsResponse>(
    GetTreatmentsAppointments,
  );

  const status = useState<StatusType>("HIDDEN");

  useEffect(() => {
    // If logged user is not a patient, do not render this component
    if (user.role !== "PATIENT") {
      status.set("HIDDEN");
      return;
    }

    // Do not render this component while data is undefined (loading or errored)
    if (!data?.myPatientProfile) {
      status.set("HIDDEN");
      return;
    }

    // TODO: this code is using the absence of likeName to assume that the
    // patient profile hasn't been created yet. It would be better if the backend
    // could have a dedicated endpoint to check if the profile is complete
    //
    // If profile is not completed, show message to redirect to profile completion
    // before selecting a treatment
    if (data.myPatientProfile?.likeName === "") {
      status.set("AWAITING_PROFILE");
      return;
    }

    // Shortcuts
    const treatments = data.myPatientProfile?.treatments;
    const appointments = data.myPatientProfile?.appointments;

    // Checks for an active treatment,
    // and show treatment selection if not found
    const activeTreatment = treatments.find((t) => t.status === "ACTIVE");
    if (!activeTreatment) {
      status.set("TREATMENT_SELECTION");
      return;
    }

    // Checks for at least one appointment in the future
    const futureAppointment = appointments.find((a) => a.end > serverTime);

    // If there's an appointment in the future, show it
    if (futureAppointment) {
      status.set("APPOINTMENT_READY");
      return;
    }

    status.set("AWAITING_APPOINTMENT");
  }, [data, user]);

  switch (status.value) {
    case "HIDDEN":
      return null;
    case "AWAITING_PROFILE":
      return <AwaitingProfile />;
    case "TREATMENT_SELECTION":
      return <TreatmentSelection />;
    case "AWAITING_APPOINTMENT":
      return <AwaitingAppointment />;
    case "APPOINTMENT_READY":
      return <AppointmentReady />;
    default:
      assertUnreachable(status.value);
  }
};

export default PatientStatus;
