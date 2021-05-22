import { gql } from "@apollo/client";

export type AppointmentStatus =
  | "PROPOSED"
  | "DENIED"
  | "CONFIRMED"
  | "CANCELED_BY_PATIENT"
  | "CANCELED_BY_PSYCHOLOGIST";

export interface MyPsychologistAppointmentsResponse {
  myPsychologistProfile: {
    id: string;
    appointments: {
      id: string;
      status: AppointmentStatus;
      start: number;
      end: number;
      patient: {
        fullName: string;
      };
    }[];
  };
}

export const MyPsychologistAppointments = gql`
  query MyPsychologistAppointments {
    myPsychologistProfile {
      id
      appointments {
        id
        status
        start
        end
        patient {
          fullName
        }
      }
    }
  }
`;

export interface ConfirmAppointmentInput {
  id: string;
}

export const ConfirmAppointment = gql`
  mutation ConfirmAppointment($id: ID!) {
    confirmAppointment(id: $id)
  }
`;

export interface DenyAppointmentInput {
  id: string;
  reason: string;
}

export const DenyAppointment = gql`
  mutation DenyAppointment($id: ID!, $reason: String!) {
    denyAppointment(id: $id, reason: $reason)
  }
`;
