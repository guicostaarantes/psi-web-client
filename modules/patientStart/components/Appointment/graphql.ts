import { gql } from "@apollo/client";

export type AppointmentStatus =
  | "CREATED"
  | "CONFIRMED_BY_PATIENT"
  | "CONFIRMED_BY_PSYCHOLOGIST"
  | "CONFIRMED_BY_BOTH"
  | "EDITED_BY_PATIENT"
  | "EDITED_BY_PSYCHOLOGIST"
  | "CANCELED_BY_PATIENT"
  | "CANCELED_BY_PSYCHOLOGIST";

export type TreatmentStatus =
  | "PENDING"
  | "ACTIVE"
  | "FINALIZED"
  | "INTERRUPTED_BY_PATIENT"
  | "INTERRUPTED_BY_PSYCHOLOGIST";

export interface MyPatientAppointmentsResponse {
  myPatientProfile: {
    id: string;
    appointments: {
      id: string;
      status: AppointmentStatus;
      start: number;
      end: number;
      price: number;
      treatment: {
        psychologist: {
          likeName: string;
        };
      };
    }[];
  };
}

export const MyPatientAppointments = gql`
  query MyPatientAppointments {
    myPatientProfile {
      id
      appointments {
        id
        status
        start
        end
        price
        treatment {
          psychologist {
            likeName
          }
        }
      }
    }
  }
`;

export interface MyPatientTreatmentsResponse {
  myPatientProfile: {
    id: string;
    likeName: string;
    treatments: {
      id: string;
      status: TreatmentStatus;
      psychologist: {
        likeName: string;
      };
    }[];
  };
}

export const MyPatientTreatments = gql`
  query MyPatientTreatments {
    myPatientProfile {
      id
      likeName
      treatments {
        id
        status
        psychologist {
          likeName
        }
      }
    }
  }
`;

export interface ConfirmAppointmentByPatientInput {
  id: string;
}

export const ConfirmAppointmentByPatient = gql`
  mutation ConfirmAppointmentByPatient($id: ID!) {
    confirmAppointmentByPatient(id: $id)
  }
`;

export interface EditAppointmentByPatientInput {
  id: string;
  input: {
    start: number;
    reason: string;
  };
}

export const EditAppointmentByPatient = gql`
  mutation EditAppointmentByPatient(
    $id: ID!
    $input: EditAppointmentByPatientInput!
  ) {
    editAppointmentByPatient(id: $id, input: $input)
  }
`;

export interface CancelAppointmentByPatientInput {
  id: string;
  reason: string;
}

export const CancelAppointmentByPatient = gql`
  mutation CancelAppointmentByPatient($id: ID!, $reason: String!) {
    cancelAppointmentByPatient(id: $id, reason: $reason)
  }
`;
