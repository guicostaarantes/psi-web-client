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
  myPatientProfile: {
    id: string;
    likeName: string;
    treatments: {
      id: string;
      status: TreatmentStatus;
      psychologist: {
        id: string;
        likeName: string;
      };
    }[];
    appointments: {
      id: string;
      start: number;
      end: number;
      status: AppointmentStatus;
    }[];
  };
}

export const GetTreatmentsAppointments = gql`
  query GetTreatmentsAppointments {
    myPatientProfile {
      id
      likeName
      treatments {
        id
        status
        psychologist {
          id
          likeName
        }
      }
      appointments {
        id
        start
        end
        status
      }
    }
  }
`;
