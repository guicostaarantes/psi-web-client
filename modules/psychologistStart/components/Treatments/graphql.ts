import { gql } from "@apollo/client";

export type TreatmentStatus =
  | "PENDING"
  | "ACTIVE"
  | "FINALIZED"
  | "INTERRUPTED_BY_PATIENT"
  | "INTERRUPTED_BY_PSYCHOLOGIST";

export interface MyPsychologistTreatmentsResponse {
  myPsychologistProfile: {
    id: string;
    treatments: {
      id: string;
      status: TreatmentStatus;
      weeklyStart: number;
      duration: number;
      price: number;
      patient: {
        fullName: string;
      };
    }[];
  };
}

export const MyPsychologistTreatments = gql`
  query MyPsychologistTreatments {
    myPsychologistProfile {
      id
      treatments {
        id
        status
        weeklyStart
        duration
        price
        patient {
          fullName
        }
      }
    }
  }
`;

export interface CreateTreatmentInput {
  weeklyStart: number;
  duration: number;
  price: number;
}

export const CreateTreatment = gql`
  mutation CreateTreatment($weeklyStart: Int!, $duration: Int!, $price: Int!) {
    createTreatment(
      input: { weeklyStart: $weeklyStart, duration: $duration, price: $price }
    )
  }
`;

export interface DeleteTreatmentInput {
  id: string;
}

export const DeleteTreatment = gql`
  mutation DeleteTreatment($id: ID!) {
    deleteTreatment(id: $id)
  }
`;

export interface InterruptTreatmentInput {
  id: string;
  reason: string;
}

export const InterruptTreatment = gql`
  mutation InterruptTreatment($id: ID!, $reason: String!) {
    interruptTreatmentByPsychologist(id: $id, reason: $reason)
  }
`;

export interface FinalizeTreatmentInput {
  id: string;
}

export const FinalizeTreatment = gql`
  mutation FinalizeTreatment($id: ID!) {
    finalizeTreatment(id: $id)
  }
`;
