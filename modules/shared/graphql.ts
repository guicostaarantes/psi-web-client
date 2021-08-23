import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Affinity = {
  __typename?: "Affinity";
  createdAt: Scalars["Int"];
  psychologist?: Maybe<PublicPsychologistProfile>;
};

export enum AppointmentStatus {
  Created = "CREATED",
  ConfirmedByPatient = "CONFIRMED_BY_PATIENT",
  ConfirmedByPsychologist = "CONFIRMED_BY_PSYCHOLOGIST",
  ConfirmedByBoth = "CONFIRMED_BY_BOTH",
  EditedByPatient = "EDITED_BY_PATIENT",
  EditedByPsychologist = "EDITED_BY_PSYCHOLOGIST",
  CanceledByPatient = "CANCELED_BY_PATIENT",
  CanceledByPsychologist = "CANCELED_BY_PSYCHOLOGIST",
  TreatmentInterruptedByPatient = "TREATMENT_INTERRUPTED_BY_PATIENT",
  TreatmentInterruptedByPsychologist = "TREATMENT_INTERRUPTED_BY_PSYCHOLOGIST",
  TreatmentFinalized = "TREATMENT_FINALIZED",
}

export type AuthenticateUserInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Characteristic = {
  __typename?: "Characteristic";
  name: Scalars["String"];
  type: CharacteristicType;
  possibleValues: Array<Scalars["String"]>;
};

export type CharacteristicChoice = {
  __typename?: "CharacteristicChoice";
  name: Scalars["String"];
  type: CharacteristicType;
  selectedValues: Array<Scalars["String"]>;
  possibleValues: Array<Scalars["String"]>;
};

export enum CharacteristicType {
  Boolean = "BOOLEAN",
  Single = "SINGLE",
  Multiple = "MULTIPLE",
}

export type CreateTreatmentInput = {
  frequency: Scalars["Int"];
  phase: Scalars["Int"];
  duration: Scalars["Int"];
  price: Scalars["Int"];
};

export type CreateUserInput = {
  email: Scalars["String"];
};

export type CreateUserWithPasswordInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  role: Role;
};

export type EditAppointmentByPatientInput = {
  start: Scalars["Int"];
  reason: Scalars["String"];
};

export type EditAppointmentByPsychologistInput = {
  start: Scalars["Int"];
  end: Scalars["Int"];
  price: Scalars["Int"];
  reason: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** The askResetPassword mutation allows a user to start a reset password procedure. */
  askResetPassword?: Maybe<Scalars["Boolean"]>;
  /** The createPatientUser mutation allows a non-user to create a user with the PATIENT role. */
  createPatientUser?: Maybe<Scalars["Boolean"]>;
  /** The createPatientUser mutation allows a user to create a user with the PSYCHOLOGIST role. */
  createPsychologistUser?: Maybe<Scalars["Boolean"]>;
  /** The createUserWithPassword mutation allows a user to create a user and set their password manually instead of sending an invitation email. */
  createUserWithPassword?: Maybe<Scalars["Boolean"]>;
  /** The resetPassword mutation allows a user to reset their password using a token sent to their email. */
  resetPassword?: Maybe<Scalars["Boolean"]>;
  /** The updateUser mutation allows a user to update specific information about another user. */
  updateUser?: Maybe<Scalars["Boolean"]>;
  /** The cancelAppointmentByPatient mutation allows a user with a patient profile to cancel the confirmation of an appointment. */
  cancelAppointmentByPatient?: Maybe<Scalars["Boolean"]>;
  /** The cancelAppointmentByPsychologist mutation allows a user with a psychologist profile to cancel the confirmation of an appointment. */
  cancelAppointmentByPsychologist?: Maybe<Scalars["Boolean"]>;
  /** The confirmAppointmentByPatient mutation allows a user with a patient profile to confirm an appointment. */
  confirmAppointmentByPatient?: Maybe<Scalars["Boolean"]>;
  /** The confirmAppointmentByPsychologist mutation allows a user with a psychologist profile to confirm an appointment. */
  confirmAppointmentByPsychologist?: Maybe<Scalars["Boolean"]>;
  /** The createPendingAppointments mutation allows a user to create appointments for all treatments in the system that are missing one in the future. */
  createPendingAppointments?: Maybe<Scalars["Boolean"]>;
  /** The editAppointmentByPatient mutation allows a user with a patient profile to edit the confirmation of an appointment. */
  editAppointmentByPatient?: Maybe<Scalars["Boolean"]>;
  /** The editAppointmentByPsychologist mutation allows a user with a psychologist profile to edit the confirmation of an appointment. */
  editAppointmentByPsychologist?: Maybe<Scalars["Boolean"]>;
  /** The setPatientCharacteristics mutation allows a user to change the possible characteristics for all patients. */
  setPatientCharacteristics?: Maybe<Scalars["Boolean"]>;
  /** The setPsychologistCharacteristics mutation allows a user to change the possible characteristics for all psychologists. */
  setPsychologistCharacteristics?: Maybe<Scalars["Boolean"]>;
  /** The processPendingMail mutation allows a user to send emails that are waiting in the queue. */
  processPendingMail?: Maybe<Scalars["Boolean"]>;
  /** The setMyPatientCharacteristicChoices mutation allows a user to set characteristics for their patient profile. */
  setMyPatientCharacteristicChoices?: Maybe<Scalars["Boolean"]>;
  /** The setMyPatientPreferences mutation allows a user to set preferences for their patient profile. */
  setMyPatientPreferences?: Maybe<Scalars["Boolean"]>;
  /** The setMyPsychologistCharacteristicChoices mutation allows a user to set characteristics for their psychologist profile. */
  setMyPsychologistCharacteristicChoices?: Maybe<Scalars["Boolean"]>;
  /** The setMyPsychologistPreferences mutation allows a user to set preferences for their psychologist profile. */
  setMyPsychologistPreferences?: Maybe<Scalars["Boolean"]>;
  /** The upsertMyPatientProfile mutation allows a user to create or make changes to their patient profile. */
  upsertMyPatientProfile?: Maybe<Scalars["Boolean"]>;
  /** The upsertMyPsychologistProfile mutation allows a user to create or make changes to their psychologist profile. */
  upsertMyPsychologistProfile?: Maybe<Scalars["Boolean"]>;
  /** The setTranslations mutation allows a user to insert or update translated translations. */
  setTranslations?: Maybe<Scalars["Boolean"]>;
  /** The assignTreatment mutation allows a user to choose a treatment and assign it to their patient profile. */
  assignTreatment?: Maybe<Scalars["Boolean"]>;
  /** The createTreatment mutation allows a user to create a pending treatment and assign it to their psychologist profile. */
  createTreatment?: Maybe<Scalars["Boolean"]>;
  /** The deleteTreatment mutation allows a user to delete a pending treatment if it is owned by their psychologist profile. */
  deleteTreatment?: Maybe<Scalars["Boolean"]>;
  /** The interruptTreatmentByPatient mutation allows a user to choose a treatment under their patient profile and interrupt it. */
  interruptTreatmentByPatient?: Maybe<Scalars["Boolean"]>;
  /** The interruptTreatmentByPsychologist mutation allows a user to choose a treatment under their psychologist profile and interrupt it. */
  interruptTreatmentByPsychologist?: Maybe<Scalars["Boolean"]>;
  /** The finalizeTreatment mutation allows a user to choose a treatment under their psychologist profile and finalize it. */
  finalizeTreatment?: Maybe<Scalars["Boolean"]>;
  /** The updateTreatment mutation allows a user to update a treatment if it is owned by their psychologist profile. */
  updateTreatment?: Maybe<Scalars["Boolean"]>;
};

export type MutationAskResetPasswordArgs = {
  email: Scalars["String"];
};

export type MutationCreatePatientUserArgs = {
  input: CreateUserInput;
};

export type MutationCreatePsychologistUserArgs = {
  input: CreateUserInput;
};

export type MutationCreateUserWithPasswordArgs = {
  input: CreateUserWithPasswordInput;
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars["ID"];
  input: UpdateUserInput;
};

export type MutationCancelAppointmentByPatientArgs = {
  id: Scalars["ID"];
  reason: Scalars["String"];
};

export type MutationCancelAppointmentByPsychologistArgs = {
  id: Scalars["ID"];
  reason: Scalars["String"];
};

export type MutationConfirmAppointmentByPatientArgs = {
  id: Scalars["ID"];
};

export type MutationConfirmAppointmentByPsychologistArgs = {
  id: Scalars["ID"];
};

export type MutationEditAppointmentByPatientArgs = {
  id: Scalars["ID"];
  input: EditAppointmentByPatientInput;
};

export type MutationEditAppointmentByPsychologistArgs = {
  id: Scalars["ID"];
  input: EditAppointmentByPsychologistInput;
};

export type MutationSetPatientCharacteristicsArgs = {
  input: Array<SetProfileCharacteristicInput>;
};

export type MutationSetPsychologistCharacteristicsArgs = {
  input: Array<SetProfileCharacteristicInput>;
};

export type MutationSetMyPatientCharacteristicChoicesArgs = {
  input: Array<SetMyProfileCharacteristicChoiceInput>;
};

export type MutationSetMyPatientPreferencesArgs = {
  input: Array<SetMyProfilePreferenceInput>;
};

export type MutationSetMyPsychologistCharacteristicChoicesArgs = {
  input: Array<SetMyProfileCharacteristicChoiceInput>;
};

export type MutationSetMyPsychologistPreferencesArgs = {
  input: Array<SetMyProfilePreferenceInput>;
};

export type MutationUpsertMyPatientProfileArgs = {
  input: UpsertMyPatientProfileInput;
};

export type MutationUpsertMyPsychologistProfileArgs = {
  input: UpsertMyPsychologistProfileInput;
};

export type MutationSetTranslationsArgs = {
  lang: Scalars["String"];
  input: Array<TranslationInput>;
};

export type MutationAssignTreatmentArgs = {
  id: Scalars["ID"];
};

export type MutationCreateTreatmentArgs = {
  input: CreateTreatmentInput;
};

export type MutationDeleteTreatmentArgs = {
  id: Scalars["ID"];
};

export type MutationInterruptTreatmentByPatientArgs = {
  id: Scalars["ID"];
  reason: Scalars["String"];
};

export type MutationInterruptTreatmentByPsychologistArgs = {
  id: Scalars["ID"];
  reason: Scalars["String"];
};

export type MutationFinalizeTreatmentArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateTreatmentArgs = {
  id: Scalars["ID"];
  input: UpdateTreatmentInput;
};

export type PatientAppointment = {
  __typename?: "PatientAppointment";
  id: Scalars["ID"];
  start: Scalars["Int"];
  end: Scalars["Int"];
  price: Scalars["Int"];
  status: AppointmentStatus;
  reason: Scalars["String"];
  link: Scalars["String"];
  treatment: PatientTreatment;
};

export type PatientProfile = {
  __typename?: "PatientProfile";
  id: Scalars["ID"];
  fullName: Scalars["String"];
  likeName: Scalars["String"];
  birthDate: Scalars["Int"];
  city: Scalars["String"];
  characteristics: Array<CharacteristicChoice>;
  preferences: Array<Preference>;
  treatments: Array<PatientTreatment>;
  appointments: Array<PatientAppointment>;
};

export type PatientTreatment = {
  __typename?: "PatientTreatment";
  id: Scalars["ID"];
  frequency: Scalars["Int"];
  phase: Scalars["Int"];
  duration: Scalars["Int"];
  price: Scalars["Int"];
  status: TreatmentStatus;
  psychologist: PublicPsychologistProfile;
};

export type Preference = {
  __typename?: "Preference";
  characteristicName: Scalars["String"];
  selectedValue: Scalars["String"];
  weight: Scalars["Int"];
};

export type PsychologistAppointment = {
  __typename?: "PsychologistAppointment";
  id: Scalars["ID"];
  start: Scalars["Int"];
  end: Scalars["Int"];
  price: Scalars["Int"];
  status: AppointmentStatus;
  reason: Scalars["String"];
  link: Scalars["String"];
  treatment: PsychologistTreatment;
};

export type PsychologistProfile = {
  __typename?: "PsychologistProfile";
  id: Scalars["ID"];
  fullName: Scalars["String"];
  likeName: Scalars["String"];
  birthDate: Scalars["Int"];
  city: Scalars["String"];
  characteristics: Array<CharacteristicChoice>;
  preferences: Array<Preference>;
  treatments: Array<PsychologistTreatment>;
  appointments: Array<PsychologistAppointment>;
};

export type PsychologistTreatment = {
  __typename?: "PsychologistTreatment";
  id: Scalars["ID"];
  frequency: Scalars["Int"];
  phase: Scalars["Int"];
  duration: Scalars["Int"];
  price: Scalars["Int"];
  status: TreatmentStatus;
  patient?: Maybe<PublicPatientProfile>;
};

export type PublicPatientProfile = {
  __typename?: "PublicPatientProfile";
  id: Scalars["ID"];
  fullName: Scalars["String"];
  likeName: Scalars["String"];
  birthDate: Scalars["Int"];
  city: Scalars["String"];
  characteristics: Array<CharacteristicChoice>;
};

export type PublicPsychologistProfile = {
  __typename?: "PublicPsychologistProfile";
  id: Scalars["ID"];
  fullName: Scalars["String"];
  likeName: Scalars["String"];
  pendingTreatments: Array<PsychologistTreatment>;
};

export type Query = {
  __typename?: "Query";
  /** The authenticateUser query allows a user to exchange their email and password for an authentication token. */
  authenticateUser: Token;
  /** The myUser query allows a user to get information about their own user. */
  myUser: User;
  /** The user query allows a user to get information about another user. */
  user: User;
  /** The usersByRole query allows a user to get users that have a specified role in the application. */
  usersByRole: Array<User>;
  /** The patientCharacteristics query allows a user to get all possible patient characteristics. */
  patientCharacteristics: Array<Characteristic>;
  /** The psychologistCharacteristics query allows a user to get all possible psychologist characteristics. */
  psychologistCharacteristics: Array<Characteristic>;
  /** The myPatientTopAffinities query allows a user to get the last calculation of affinities for their patient profile. */
  myPatientTopAffinities: Array<Affinity>;
  /** The myPatientProfile query allows a user to get their own patient profile. */
  myPatientProfile?: Maybe<PatientProfile>;
  /** The myPsychologistProfile query allows a user to get their own patient profile. */
  myPsychologistProfile?: Maybe<PsychologistProfile>;
  /** The patientProfile query allows a user to get a patient profile from other user. */
  patientProfile?: Maybe<PublicPatientProfile>;
  /** The psychologistProfile query allows a user to get a psychologist profile from other user. */
  psychologistProfile?: Maybe<PublicPsychologistProfile>;
  /** The time query allows the user to know the timestamp of the server. */
  time: Scalars["Int"];
  /** The translations query allows a user to get translated translations by language and keys. */
  translations: Array<Translation>;
};

export type QueryAuthenticateUserArgs = {
  input: AuthenticateUserInput;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryUsersByRoleArgs = {
  role: Role;
};

export type QueryPatientProfileArgs = {
  id: Scalars["ID"];
};

export type QueryPsychologistProfileArgs = {
  id: Scalars["ID"];
};

export type QueryTranslationsArgs = {
  lang: Scalars["String"];
  keys: Array<Scalars["String"]>;
};

export type ResetPasswordInput = {
  token: Scalars["String"];
  password: Scalars["String"];
};

export enum Role {
  Jobrunner = "JOBRUNNER",
  Coordinator = "COORDINATOR",
  Psychologist = "PSYCHOLOGIST",
  Patient = "PATIENT",
}

export type SetMyProfileCharacteristicChoiceInput = {
  characteristicName: Scalars["String"];
  selectedValues: Array<Scalars["String"]>;
};

export type SetMyProfilePreferenceInput = {
  characteristicName: Scalars["String"];
  selectedValue: Scalars["String"];
  weight: Scalars["Int"];
};

export type SetProfileCharacteristicInput = {
  name: Scalars["String"];
  type: CharacteristicType;
  possibleValues: Array<Scalars["String"]>;
};

export type Token = {
  __typename?: "Token";
  token: Scalars["String"];
  expiresAt: Scalars["Int"];
};

export type Translation = {
  __typename?: "Translation";
  lang: Scalars["String"];
  key: Scalars["String"];
  value: Scalars["String"];
};

export type TranslationInput = {
  key: Scalars["String"];
  value: Scalars["String"];
};

export enum TreatmentStatus {
  Pending = "PENDING",
  Active = "ACTIVE",
  Finalized = "FINALIZED",
  InterruptedByPsychologist = "INTERRUPTED_BY_PSYCHOLOGIST",
  InterruptedByPatient = "INTERRUPTED_BY_PATIENT",
}

export type UpdateTreatmentInput = {
  frequency: Scalars["Int"];
  phase: Scalars["Int"];
  duration: Scalars["Int"];
  price: Scalars["Int"];
};

export type UpdateUserInput = {
  active: Scalars["Boolean"];
  role: Role;
};

export type UpsertMyPatientProfileInput = {
  fullName: Scalars["String"];
  likeName: Scalars["String"];
  birthDate: Scalars["Int"];
  city: Scalars["String"];
};

export type UpsertMyPsychologistProfileInput = {
  fullName: Scalars["String"];
  likeName: Scalars["String"];
  birthDate: Scalars["Int"];
  city: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  role: Role;
};

export type MyUserQueryVariables = Exact<{ [key: string]: never }>;

export type MyUserQuery = {
  __typename?: "Query";
  myUser: { __typename?: "User"; id: string; email: string; role: Role };
};

export type AssignTreatmentMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AssignTreatmentMutation = {
  __typename?: "Mutation";
  assignTreatment?: Maybe<boolean>;
};

export type CancelAppointmentByPatientMutationVariables = Exact<{
  id: Scalars["ID"];
  reason: Scalars["String"];
}>;

export type CancelAppointmentByPatientMutation = {
  __typename?: "Mutation";
  cancelAppointmentByPatient?: Maybe<boolean>;
};

export type ConfirmAppointmentByPatientMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ConfirmAppointmentByPatientMutation = {
  __typename?: "Mutation";
  confirmAppointmentByPatient?: Maybe<boolean>;
};

export type EditAppointmentByPatientMutationVariables = Exact<{
  id: Scalars["ID"];
  input: EditAppointmentByPatientInput;
}>;

export type EditAppointmentByPatientMutation = {
  __typename?: "Mutation";
  editAppointmentByPatient?: Maybe<boolean>;
};

export type InterruptTreatmentByPatientMutationVariables = Exact<{
  id: Scalars["ID"];
  reason: Scalars["String"];
}>;

export type InterruptTreatmentByPatientMutation = {
  __typename?: "Mutation";
  interruptTreatmentByPatient?: Maybe<boolean>;
};

export type MyPatientAppointmentsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MyPatientAppointmentsQuery = {
  __typename?: "Query";
  myPatientProfile?: Maybe<{
    __typename?: "PatientProfile";
    id: string;
    appointments: Array<{
      __typename?: "PatientAppointment";
      id: string;
      status: AppointmentStatus;
      start: number;
      end: number;
      price: number;
      treatment: {
        __typename?: "PatientTreatment";
        psychologist: {
          __typename?: "PublicPsychologistProfile";
          likeName: string;
        };
      };
    }>;
  }>;
};

export type MyPatientLikeNameQueryVariables = Exact<{ [key: string]: never }>;

export type MyPatientLikeNameQuery = {
  __typename?: "Query";
  myPatientProfile?: Maybe<{
    __typename?: "PatientProfile";
    id: string;
    likeName: string;
  }>;
};

export type MyPatientTopAffinitiesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MyPatientTopAffinitiesQuery = {
  __typename?: "Query";
  myPatientTopAffinities: Array<{
    __typename?: "Affinity";
    psychologist?: Maybe<{
      __typename?: "PublicPsychologistProfile";
      id: string;
      fullName: string;
      pendingTreatments: Array<{
        __typename?: "PsychologistTreatment";
        id: string;
        frequency: number;
        phase: number;
        duration: number;
        price: number;
      }>;
    }>;
  }>;
};

export type MyPatientTreatmentsQueryVariables = Exact<{ [key: string]: never }>;

export type MyPatientTreatmentsQuery = {
  __typename?: "Query";
  myPatientProfile?: Maybe<{
    __typename?: "PatientProfile";
    id: string;
    likeName: string;
    treatments: Array<{
      __typename?: "PatientTreatment";
      id: string;
      status: TreatmentStatus;
      psychologist: {
        __typename?: "PublicPsychologistProfile";
        likeName: string;
      };
    }>;
  }>;
};

export type GetServerTimeQueryVariables = Exact<{ [key: string]: never }>;

export type GetServerTimeQuery = { __typename?: "Query"; time: number };

export const MyUserDocument = gql`
  query MyUser {
    myUser {
      id
      email
      role
    }
  }
`;

/**
 * __useMyUserQuery__
 *
 * To run a query within a React component, call `useMyUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUserQuery(
  baseOptions?: Apollo.QueryHookOptions<MyUserQuery, MyUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyUserQuery, MyUserQueryVariables>(
    MyUserDocument,
    options,
  );
}
export function useMyUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyUserQuery, MyUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyUserQuery, MyUserQueryVariables>(
    MyUserDocument,
    options,
  );
}
export type MyUserQueryHookResult = ReturnType<typeof useMyUserQuery>;
export type MyUserLazyQueryHookResult = ReturnType<typeof useMyUserLazyQuery>;
export type MyUserQueryResult = Apollo.QueryResult<
  MyUserQuery,
  MyUserQueryVariables
>;
export const AssignTreatmentDocument = gql`
  mutation AssignTreatment($id: ID!) {
    assignTreatment(id: $id)
  }
`;
export type AssignTreatmentMutationFn = Apollo.MutationFunction<
  AssignTreatmentMutation,
  AssignTreatmentMutationVariables
>;

/**
 * __useAssignTreatmentMutation__
 *
 * To run a mutation, you first call `useAssignTreatmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignTreatmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignTreatmentMutation, { data, loading, error }] = useAssignTreatmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAssignTreatmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AssignTreatmentMutation,
    AssignTreatmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AssignTreatmentMutation,
    AssignTreatmentMutationVariables
  >(AssignTreatmentDocument, options);
}
export type AssignTreatmentMutationHookResult = ReturnType<
  typeof useAssignTreatmentMutation
>;
export type AssignTreatmentMutationResult = Apollo.MutationResult<AssignTreatmentMutation>;
export type AssignTreatmentMutationOptions = Apollo.BaseMutationOptions<
  AssignTreatmentMutation,
  AssignTreatmentMutationVariables
>;
export const CancelAppointmentByPatientDocument = gql`
  mutation CancelAppointmentByPatient($id: ID!, $reason: String!) {
    cancelAppointmentByPatient(id: $id, reason: $reason)
  }
`;
export type CancelAppointmentByPatientMutationFn = Apollo.MutationFunction<
  CancelAppointmentByPatientMutation,
  CancelAppointmentByPatientMutationVariables
>;

/**
 * __useCancelAppointmentByPatientMutation__
 *
 * To run a mutation, you first call `useCancelAppointmentByPatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelAppointmentByPatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelAppointmentByPatientMutation, { data, loading, error }] = useCancelAppointmentByPatientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useCancelAppointmentByPatientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CancelAppointmentByPatientMutation,
    CancelAppointmentByPatientMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CancelAppointmentByPatientMutation,
    CancelAppointmentByPatientMutationVariables
  >(CancelAppointmentByPatientDocument, options);
}
export type CancelAppointmentByPatientMutationHookResult = ReturnType<
  typeof useCancelAppointmentByPatientMutation
>;
export type CancelAppointmentByPatientMutationResult = Apollo.MutationResult<CancelAppointmentByPatientMutation>;
export type CancelAppointmentByPatientMutationOptions = Apollo.BaseMutationOptions<
  CancelAppointmentByPatientMutation,
  CancelAppointmentByPatientMutationVariables
>;
export const ConfirmAppointmentByPatientDocument = gql`
  mutation ConfirmAppointmentByPatient($id: ID!) {
    confirmAppointmentByPatient(id: $id)
  }
`;
export type ConfirmAppointmentByPatientMutationFn = Apollo.MutationFunction<
  ConfirmAppointmentByPatientMutation,
  ConfirmAppointmentByPatientMutationVariables
>;

/**
 * __useConfirmAppointmentByPatientMutation__
 *
 * To run a mutation, you first call `useConfirmAppointmentByPatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmAppointmentByPatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmAppointmentByPatientMutation, { data, loading, error }] = useConfirmAppointmentByPatientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useConfirmAppointmentByPatientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmAppointmentByPatientMutation,
    ConfirmAppointmentByPatientMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmAppointmentByPatientMutation,
    ConfirmAppointmentByPatientMutationVariables
  >(ConfirmAppointmentByPatientDocument, options);
}
export type ConfirmAppointmentByPatientMutationHookResult = ReturnType<
  typeof useConfirmAppointmentByPatientMutation
>;
export type ConfirmAppointmentByPatientMutationResult = Apollo.MutationResult<ConfirmAppointmentByPatientMutation>;
export type ConfirmAppointmentByPatientMutationOptions = Apollo.BaseMutationOptions<
  ConfirmAppointmentByPatientMutation,
  ConfirmAppointmentByPatientMutationVariables
>;
export const EditAppointmentByPatientDocument = gql`
  mutation EditAppointmentByPatient(
    $id: ID!
    $input: EditAppointmentByPatientInput!
  ) {
    editAppointmentByPatient(id: $id, input: $input)
  }
`;
export type EditAppointmentByPatientMutationFn = Apollo.MutationFunction<
  EditAppointmentByPatientMutation,
  EditAppointmentByPatientMutationVariables
>;

/**
 * __useEditAppointmentByPatientMutation__
 *
 * To run a mutation, you first call `useEditAppointmentByPatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAppointmentByPatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAppointmentByPatientMutation, { data, loading, error }] = useEditAppointmentByPatientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditAppointmentByPatientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditAppointmentByPatientMutation,
    EditAppointmentByPatientMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EditAppointmentByPatientMutation,
    EditAppointmentByPatientMutationVariables
  >(EditAppointmentByPatientDocument, options);
}
export type EditAppointmentByPatientMutationHookResult = ReturnType<
  typeof useEditAppointmentByPatientMutation
>;
export type EditAppointmentByPatientMutationResult = Apollo.MutationResult<EditAppointmentByPatientMutation>;
export type EditAppointmentByPatientMutationOptions = Apollo.BaseMutationOptions<
  EditAppointmentByPatientMutation,
  EditAppointmentByPatientMutationVariables
>;
export const InterruptTreatmentByPatientDocument = gql`
  mutation InterruptTreatmentByPatient($id: ID!, $reason: String!) {
    interruptTreatmentByPatient(id: $id, reason: $reason)
  }
`;
export type InterruptTreatmentByPatientMutationFn = Apollo.MutationFunction<
  InterruptTreatmentByPatientMutation,
  InterruptTreatmentByPatientMutationVariables
>;

/**
 * __useInterruptTreatmentByPatientMutation__
 *
 * To run a mutation, you first call `useInterruptTreatmentByPatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInterruptTreatmentByPatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [interruptTreatmentByPatientMutation, { data, loading, error }] = useInterruptTreatmentByPatientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useInterruptTreatmentByPatientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InterruptTreatmentByPatientMutation,
    InterruptTreatmentByPatientMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InterruptTreatmentByPatientMutation,
    InterruptTreatmentByPatientMutationVariables
  >(InterruptTreatmentByPatientDocument, options);
}
export type InterruptTreatmentByPatientMutationHookResult = ReturnType<
  typeof useInterruptTreatmentByPatientMutation
>;
export type InterruptTreatmentByPatientMutationResult = Apollo.MutationResult<InterruptTreatmentByPatientMutation>;
export type InterruptTreatmentByPatientMutationOptions = Apollo.BaseMutationOptions<
  InterruptTreatmentByPatientMutation,
  InterruptTreatmentByPatientMutationVariables
>;
export const MyPatientAppointmentsDocument = gql`
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

/**
 * __useMyPatientAppointmentsQuery__
 *
 * To run a query within a React component, call `useMyPatientAppointmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPatientAppointmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPatientAppointmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPatientAppointmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyPatientAppointmentsQuery,
    MyPatientAppointmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MyPatientAppointmentsQuery,
    MyPatientAppointmentsQueryVariables
  >(MyPatientAppointmentsDocument, options);
}
export function useMyPatientAppointmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyPatientAppointmentsQuery,
    MyPatientAppointmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyPatientAppointmentsQuery,
    MyPatientAppointmentsQueryVariables
  >(MyPatientAppointmentsDocument, options);
}
export type MyPatientAppointmentsQueryHookResult = ReturnType<
  typeof useMyPatientAppointmentsQuery
>;
export type MyPatientAppointmentsLazyQueryHookResult = ReturnType<
  typeof useMyPatientAppointmentsLazyQuery
>;
export type MyPatientAppointmentsQueryResult = Apollo.QueryResult<
  MyPatientAppointmentsQuery,
  MyPatientAppointmentsQueryVariables
>;
export const MyPatientLikeNameDocument = gql`
  query MyPatientLikeName {
    myPatientProfile {
      id
      likeName
    }
  }
`;

/**
 * __useMyPatientLikeNameQuery__
 *
 * To run a query within a React component, call `useMyPatientLikeNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPatientLikeNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPatientLikeNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPatientLikeNameQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyPatientLikeNameQuery,
    MyPatientLikeNameQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MyPatientLikeNameQuery,
    MyPatientLikeNameQueryVariables
  >(MyPatientLikeNameDocument, options);
}
export function useMyPatientLikeNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyPatientLikeNameQuery,
    MyPatientLikeNameQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyPatientLikeNameQuery,
    MyPatientLikeNameQueryVariables
  >(MyPatientLikeNameDocument, options);
}
export type MyPatientLikeNameQueryHookResult = ReturnType<
  typeof useMyPatientLikeNameQuery
>;
export type MyPatientLikeNameLazyQueryHookResult = ReturnType<
  typeof useMyPatientLikeNameLazyQuery
>;
export type MyPatientLikeNameQueryResult = Apollo.QueryResult<
  MyPatientLikeNameQuery,
  MyPatientLikeNameQueryVariables
>;
export const MyPatientTopAffinitiesDocument = gql`
  query MyPatientTopAffinities {
    myPatientTopAffinities {
      psychologist {
        id
        fullName
        pendingTreatments {
          id
          frequency
          phase
          duration
          price
        }
      }
    }
  }
`;

/**
 * __useMyPatientTopAffinitiesQuery__
 *
 * To run a query within a React component, call `useMyPatientTopAffinitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPatientTopAffinitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPatientTopAffinitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPatientTopAffinitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyPatientTopAffinitiesQuery,
    MyPatientTopAffinitiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MyPatientTopAffinitiesQuery,
    MyPatientTopAffinitiesQueryVariables
  >(MyPatientTopAffinitiesDocument, options);
}
export function useMyPatientTopAffinitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyPatientTopAffinitiesQuery,
    MyPatientTopAffinitiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyPatientTopAffinitiesQuery,
    MyPatientTopAffinitiesQueryVariables
  >(MyPatientTopAffinitiesDocument, options);
}
export type MyPatientTopAffinitiesQueryHookResult = ReturnType<
  typeof useMyPatientTopAffinitiesQuery
>;
export type MyPatientTopAffinitiesLazyQueryHookResult = ReturnType<
  typeof useMyPatientTopAffinitiesLazyQuery
>;
export type MyPatientTopAffinitiesQueryResult = Apollo.QueryResult<
  MyPatientTopAffinitiesQuery,
  MyPatientTopAffinitiesQueryVariables
>;
export const MyPatientTreatmentsDocument = gql`
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

/**
 * __useMyPatientTreatmentsQuery__
 *
 * To run a query within a React component, call `useMyPatientTreatmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPatientTreatmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPatientTreatmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPatientTreatmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyPatientTreatmentsQuery,
    MyPatientTreatmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MyPatientTreatmentsQuery,
    MyPatientTreatmentsQueryVariables
  >(MyPatientTreatmentsDocument, options);
}
export function useMyPatientTreatmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyPatientTreatmentsQuery,
    MyPatientTreatmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyPatientTreatmentsQuery,
    MyPatientTreatmentsQueryVariables
  >(MyPatientTreatmentsDocument, options);
}
export type MyPatientTreatmentsQueryHookResult = ReturnType<
  typeof useMyPatientTreatmentsQuery
>;
export type MyPatientTreatmentsLazyQueryHookResult = ReturnType<
  typeof useMyPatientTreatmentsLazyQuery
>;
export type MyPatientTreatmentsQueryResult = Apollo.QueryResult<
  MyPatientTreatmentsQuery,
  MyPatientTreatmentsQueryVariables
>;
export const GetServerTimeDocument = gql`
  query GetServerTime {
    time
  }
`;

/**
 * __useGetServerTimeQuery__
 *
 * To run a query within a React component, call `useGetServerTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServerTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServerTimeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServerTimeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetServerTimeQuery,
    GetServerTimeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetServerTimeQuery, GetServerTimeQueryVariables>(
    GetServerTimeDocument,
    options,
  );
}
export function useGetServerTimeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetServerTimeQuery,
    GetServerTimeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetServerTimeQuery, GetServerTimeQueryVariables>(
    GetServerTimeDocument,
    options,
  );
}
export type GetServerTimeQueryHookResult = ReturnType<
  typeof useGetServerTimeQuery
>;
export type GetServerTimeLazyQueryHookResult = ReturnType<
  typeof useGetServerTimeLazyQuery
>;
export type GetServerTimeQueryResult = Apollo.QueryResult<
  GetServerTimeQuery,
  GetServerTimeQueryVariables
>;
