import { useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import { useEffect } from "react";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
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

    // TODO: this code is using the absence of likeName to assume that the
    // patient profile hasn't been created yet. It would be better if the backend
    // could have a dedicated endpoint to check if the profile is complete
    //
    // If profile is not completed, show message to redirect to profile completion
    if (data.myPatientProfile?.likeName === "") {
      status.set("AWAITING_PROFILE");
      return;
    }

    // Shortcuts
    const treatments = data.myPatientProfile?.treatments;
    const appointments = data.myPatientProfile?.appointments;

    // If there's no active nor pending treatments, show message for user to
    // start matchmaking algorithm and get a treatment
    if (treatments.every((t) => t.status !== "ACTIVE")) {
      status.set("TREATMENT_SELECTION");
      return;
    }

    // Checks for at least one appointment with proposed or confirmed status
    // whose end is in the future
    let appointmentStatus: "MISSING" | "PROPOSED" | "CONFIRMED" = "MISSING";
    for (const a of appointments) {
      if (a.status === "PROPOSED" && a.end > data.time) {
        appointmentStatus = "PROPOSED";
        break;
      }
      if (a.status === "CONFIRMED" && a.end > data.time) {
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
    case "APPOINTMENT_SELECTION":
      return <AppointmentSelection />;
    case "APPOINTMENT_APPROVAL":
      return <div>APPOINTMENT_APPROVAL</div>;
    case "APPOINTMENT_READY":
      return <div>APPOINTMENT_READY</div>;
    default:
      assertUnreachable(status.value);
  }
};

export default PatientStatus;
