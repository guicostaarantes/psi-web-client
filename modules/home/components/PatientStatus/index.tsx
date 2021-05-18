import { useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import { useEffect } from "react";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import AppointmentApproval from "@psi/home/components/PatientStatus/components/AppointmentApproval";
import AppointmentReady from "@psi/home/components/PatientStatus/components/AppointmentReady";
import AppointmentSelection from "@psi/home/components/PatientStatus/components/AppointmentSelection";
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
    if (!data?.myPatientProfile) {
      status.set("HIDDEN");
      return;
    }

    // Shortcuts
    const treatments = data.myPatientProfile?.treatments;
    const appointments = data.myPatientProfile?.appointments;

    // Checks for at least one appointment with proposed or confirmed status
    // whose end is in the future
    let appointmentStatus: "MISSING" | "PROPOSED" | "CONFIRMED" = "MISSING";
    for (const a of appointments) {
      if (a.status === "CONFIRMED" && a.end > data.time) {
        appointmentStatus = "CONFIRMED";
        break;
      }
      if (a.status === "PROPOSED" && a.end > data.time) {
        appointmentStatus = "PROPOSED";
        break;
      }
    }

    // If there's no active nor pending appointments, show message with details
    // about the next appointment
    if (appointmentStatus === "CONFIRMED") {
      status.set("APPOINTMENT_READY");
      return;
    }

    // If there is a proposed appointment, show message asking user to wait for
    // psychologist approval
    if (appointmentStatus === "PROPOSED") {
      status.set("APPOINTMENT_APPROVAL");
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

    // If user has an active treatment, show message to schedule a new appointment
    if (treatments.some((t) => t.status === "ACTIVE")) {
      status.set("APPOINTMENT_SELECTION");
      return;
    }

    // If none of the above is true, show message to let user choose new treatment
    status.set("TREATMENT_SELECTION");
  }, [data, user]);

  switch (status.value) {
    case "HIDDEN":
      return null;
    case "AWAITING_PROFILE":
      return <AwaitingProfile />;
    case "TREATMENT_SELECTION":
      return <TreatmentSelection />;
    case "APPOINTMENT_SELECTION":
      return <AppointmentSelection />;
    case "APPOINTMENT_APPROVAL":
      return <AppointmentApproval />;
    case "APPOINTMENT_READY":
      return <AppointmentReady />;
    default:
      assertUnreachable(status.value);
  }
};

export default PatientStatus;
