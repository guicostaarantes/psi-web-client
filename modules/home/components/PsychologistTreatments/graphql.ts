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
      duration: number;
      price: number;
      interval: number;
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
        duration
        price
        interval
        patient {
          fullName
        }
      }
    }
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
