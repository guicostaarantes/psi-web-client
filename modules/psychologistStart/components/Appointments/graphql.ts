import { gql } from "@apollo/client";

export type AppointmentStatus =
  | "CREATED"
  | "CONFIRMED_BY_PATIENT"
  | "CONFIRMED_BY_PSYCHOLOGIST"
  | "CONFIRMED_BY_BOTH"
  | "EDITED_BY_PATIENT"
  | "EDITED_BY_PSYCHOLOGIST"
  | "CANCELED_BY_PATIENT"
  | "CANCELED_BY_PSYCHOLOGIST"
  | "TREATMENT_INTERRUPTED_BY_PATIENT"
  | "TREATMENT_INTERRUPTED_BY_PSYCHOLOGIST"
  | "TREATMENT_FINALIZED";

export interface MyPsychologistAppointmentsResponse {
  myPsychologistProfile: {
    id: string;
    appointments: {
      id: string;
      status: AppointmentStatus;
      start: number;
      end: number;
      price: number;
      treatment: {
        patient: {
          fullName: string;
        };
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
        price
        treatment {
          patient {
            fullName
          }
        }
      }
    }
  }
`;

export interface ConfirmAppointmentByPsychologistInput {
  id: string;
}

export const ConfirmAppointmentByPsychologist = gql`
  mutation ConfirmAppointmentByPsychologist($id: ID!) {
    confirmAppointmentByPsychologist(id: $id)
  }
`;

export interface EditAppointmentByPsychologistInput {
  id: string;
  input: {
    start: number;
    reason: string;
  };
}

export const EditAppointmentByPsychologist = gql`
  mutation EditAppointmentByPsychologist(
    $id: ID!
    $input: EditAppointmentByPsychologistInput!
  ) {
    editAppointmentByPsychologist(id: $id, input: $input)
  }
`;

export interface CancelAppointmentByPsychologistInput {
  id: string;
  reason: string;
}

export const CancelAppointmentByPsychologist = gql`
  mutation CancelAppointmentByPsychologist($id: ID!, $reason: String!) {
    cancelAppointmentByPsychologist(id: $id, reason: $reason)
  }
`;
