import { useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import { useEffect } from "react";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import AwaitingProfile from "@psi/home/components/PatientStatus/components/AwaitingProfile";
import TreatmentSelection from "@psi/home/components/PatientStatus/components/TreatmentSelection";
import {
  GetTreatmentsAppointments,
  GetTreatmentsAppointmentsResponse,
} from "@psi/home/components/PatientStatus/graphql";
import assertUnreachable from "@psi/shared/utils/assertNeverType";

type StatusType =
  | "HIDDEN"
  | "AWAITING_PROFILE"
  | "TREATMENT_SELECTION"
  | "TREATMENT_APPROVAL"
  | "APPOINTMENT_SELECTION"
  | "APPOINTMENT_APPROVAL"
  | "APPOINTMENT_READY";

const PatientStatus = () => {
  const user = useCurrentUser();

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
    if (!data?.getOwnPatientProfile) {
      status.set("HIDDEN");
      return;
    }

    // TODO: this code is using the absence of likeName to assume that the
    // patient profile hasn't been created yet. It would be better if the backend
    // could have a dedicated endpoint to check if the profile is complete
    //
    // If profile is not completed, show message to redirect to profile completion
    if (data.getOwnPatientProfile?.likeName === "") {
      status.set("AWAITING_PROFILE");
      return;
    }

    // Shortcuts
    const treatments = data.getOwnPatientProfile?.treatments;
    const appointments = data.getOwnPatientProfile?.appointments;

    // Checks for at least one treatment with pending or active status
    let treatmentStatus: "MISSING" | "PENDING" | "ACTIVE" = "MISSING";
    for (const t of treatments) {
      if (t.status === "PENDING") {
        treatmentStatus = "PENDING";
        break;
      }
      if (t.status === "ACTIVE") {
        treatmentStatus = "ACTIVE";
        break;
      }
    }

    // If there's no active nor pending treatments, show message for user to
    // start matchmaking algorithm and get a treatment
    if (treatmentStatus === "MISSING") {
      status.set("TREATMENT_SELECTION");
      return;
    }

    // If there is a pending treatment, show message asking user to wait for
    // psychologist approval
    if (treatmentStatus === "PENDING") {
      status.set("TREATMENT_APPROVAL");
      return;
    }

    // TODO: this check trusts in the client system clock. It would be better if
    // the server could provide a expired flag based on its own time
    //
    // Checks for at least one appointment with proposed or confirmed status
    // whose end is in the future
    let appointmentStatus: "MISSING" | "PROPOSED" | "CONFIRMED" = "MISSING";
    const currentTimestamp = (Date.now() / 1000) >> 0;
    for (const a of appointments) {
      if (a.status === "PROPOSED" && a.end > currentTimestamp) {
        appointmentStatus = "PROPOSED";
        break;
      }
      if (a.status === "CONFIRMED" && a.end > currentTimestamp) {
        appointmentStatus = "CONFIRMED";
        break;
      }
    }

    // If there's no active nor pending appointments, show message for user to
    // look for psychologist calendar and schedule
    if (appointmentStatus === "MISSING") {
      status.set("APPOINTMENT_SELECTION");
      return;
    }

    // If there is a proposed appointment, show message asking user to wait for
    // psychologist approval
    if (appointmentStatus === "PROPOSED") {
      status.set("APPOINTMENT_APPROVAL");
      return;
    }

    // If none above is true, it means that the user has an appointment ready
    // so show message with details about the next appointment
    status.set("APPOINTMENT_READY");
  }, [data, user]);

  switch (status.value) {
    case "HIDDEN":
      return null;
    case "AWAITING_PROFILE":
      return <AwaitingProfile />;
    case "TREATMENT_SELECTION":
      return <TreatmentSelection />;
    case "TREATMENT_APPROVAL":
      return <div>TREATMENT_APPROVAL</div>;
    case "APPOINTMENT_SELECTION":
      return <div>APPOINTMENT_SELECTION</div>;
    case "APPOINTMENT_APPROVAL":
      return <div>APPOINTMENT_APPROVAL</div>;
    case "APPOINTMENT_READY":
      return <div>APPOINTMENT_READY</div>;
    default:
      assertUnreachable(status.value);
  }
};

export default PatientStatus;
