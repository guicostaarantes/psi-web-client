import { gql } from "@apollo/client";

export type TreatmentStatus =
  | "PENDING"
  | "ACTIVE"
  | "FINALIZED"
  | "INTERRUPTED_BY_PATIENT"
  | "INTERRUPTED_BY_PSYCHOLOGIST";

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

export interface InterruptTreatmentByPatientInput {
  id: string;
  reason: string;
}

export const InterruptTreatmentByPatient = gql`
  mutation InterruptTreatmentByPatient($id: ID!, $reason: String!) {
    interruptTreatmentByPatient(id: $id, reason: $reason)
  }
`;
