import { gql } from "@apollo/client";

export type AppointmentStatus =
  | "PROPOSED"
  | "DENIED"
  | "CONFIRMED"
  | "CANCELED_BY_PATIENT"
  | "CANCELED_BY_PSYCHOLOGIST";

export type TreatmentStatus =
  | "PENDING"
  | "ACTIVE"
  | "FINALIZED"
  | "INTERRUPTED_BY_PATIENT"
  | "INTERRUPTED_BY_PSYCHOLOGIST";

export interface GetTreatmentsAppointmentsResponse {
  time: number;
  getOwnPatientProfile: {
    id: string;
    likeName: string;
    treatments: {
      id: string;
      status: TreatmentStatus;
    }[];
    appointments: {
      id: string;
      end: number;
      status: AppointmentStatus;
    }[];
  };
}

export const GetTreatmentsAppointments = gql`
  query GetTreatmentsAppointments {
    time
    getOwnPatientProfile {
      id
      likeName
      treatments {
        id
        status
      }
      appointments {
        id
        end
        status
      }
    }
  }
`;
