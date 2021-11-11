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
  Upload: File;
};

export type Affinity = {
  __typename?: "Affinity";
  createdAt: Scalars["Int"];
  psychologist?: Maybe<PublicPsychologistProfile>;
};

export type Agreement = {
  __typename?: "Agreement";
  id: Scalars["ID"];
  termName: Scalars["String"];
  termVersion: Scalars["Int"];
  profileId: Scalars["String"];
  signedAt: Scalars["Int"];
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
  priceRangeName: Scalars["String"];
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
  priceRangeName: Scalars["String"];
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
  /** The upsertPatientAgreement mutation allows a user to create or update an agreement to a term for patients. */
  upsertPatientAgreement?: Maybe<Scalars["Boolean"]>;
  /** The upsertPsychologistAgreement mutation allows a user to create or update an agreement to a term for psychologists. */
  upsertPsychologistAgreement?: Maybe<Scalars["Boolean"]>;
  /** The upsertTerm mutation allows a user to create or update a term. */
  upsertTerm?: Maybe<Scalars["Boolean"]>;
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
  /** The setTreatmentPriceRanges mutation allows a user to change the possible treatment price ranges. */
  setTreatmentPriceRanges?: Maybe<Scalars["Boolean"]>;
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

export type MutationUpsertPatientAgreementArgs = {
  input: UpsertAgreementInput;
};

export type MutationUpsertPsychologistAgreementArgs = {
  input: UpsertAgreementInput;
};

export type MutationUpsertTermArgs = {
  input: UpsertTermInput;
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
  priceRangeName: Scalars["String"];
};

export type MutationCreateTreatmentArgs = {
  input: CreateTreatmentInput;
};

export type MutationDeleteTreatmentArgs = {
  id: Scalars["ID"];
  priceRangeName: Scalars["String"];
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

export type MutationSetTreatmentPriceRangesArgs = {
  input: Array<SetTreatmentPriceRangesInput>;
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
  priceRange?: Maybe<TreatmentPriceRange>;
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
  avatar: Scalars["String"];
  characteristics: Array<CharacteristicChoice>;
  preferences: Array<Preference>;
  agreements: Array<Agreement>;
  treatments: Array<PatientTreatment>;
  appointments: Array<PatientAppointment>;
};

export type PatientTreatment = {
  __typename?: "PatientTreatment";
  id: Scalars["ID"];
  frequency: Scalars["Int"];
  phase: Scalars["Int"];
  duration: Scalars["Int"];
  priceRange?: Maybe<TreatmentPriceRange>;
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
  priceRange?: Maybe<TreatmentPriceRange>;
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
  crp: Scalars["String"];
  whatsapp: Scalars["String"];
  instagram: Scalars["String"];
  bio: Scalars["String"];
  avatar: Scalars["String"];
  characteristics: Array<CharacteristicChoice>;
  preferences: Array<Preference>;
  agreements: Array<Agreement>;
  treatments: Array<PsychologistTreatment>;
  priceRangeOfferings: Array<TreatmentPriceRangeOffering>;
  appointments: Array<PsychologistAppointment>;
};

export type PsychologistTreatment = {
  __typename?: "PsychologistTreatment";
  id: Scalars["ID"];
  frequency: Scalars["Int"];
  phase: Scalars["Int"];
  duration: Scalars["Int"];
  priceRange?: Maybe<TreatmentPriceRange>;
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
  avatar: Scalars["String"];
  characteristics: Array<CharacteristicChoice>;
};

export type PublicPsychologistProfile = {
  __typename?: "PublicPsychologistProfile";
  id: Scalars["ID"];
  fullName: Scalars["String"];
  likeName: Scalars["String"];
  city: Scalars["String"];
  crp: Scalars["String"];
  whatsapp: Scalars["String"];
  instagram: Scalars["String"];
  bio: Scalars["String"];
  avatar: Scalars["String"];
  pendingTreatments: Array<PsychologistTreatment>;
  priceRangeOfferings: Array<TreatmentPriceRangeOffering>;
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
  /** The patientProfile query allows a user to get a patient profile from other user. */
  patientTerms: Array<Term>;
  /** The psychologistProfile query allows a user to get a psychologist profile from other user. */
  psychologistTerms: Array<Term>;
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
  /** The treatmentPriceRanges query allows a user to retrieve the possible treatment price ranges. */
  treatmentPriceRanges: Array<TreatmentPriceRange>;
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

export type SetTreatmentPriceRangesInput = {
  name: Scalars["String"];
  minimumPrice: Scalars["Int"];
  maximumPrice: Scalars["Int"];
  eligibleFor: Scalars["String"];
};

export type Term = {
  __typename?: "Term";
  name: Scalars["String"];
  version: Scalars["Int"];
  active: Scalars["Boolean"];
};

export enum TermProfileType {
  Patient = "PATIENT",
  Psychologist = "PSYCHOLOGIST",
}

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

export type TreatmentPriceRange = {
  __typename?: "TreatmentPriceRange";
  name: Scalars["ID"];
  minimumPrice: Scalars["Int"];
  maximumPrice: Scalars["Int"];
  eligibleFor: Scalars["String"];
};

export type TreatmentPriceRangeOffering = {
  __typename?: "TreatmentPriceRangeOffering";
  id: Scalars["ID"];
  priceRange?: Maybe<TreatmentPriceRange>;
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
  priceRangeName?: Maybe<Scalars["String"]>;
};

export type UpdateUserInput = {
  active: Scalars["Boolean"];
  role: Role;
};

export type UpsertAgreementInput = {
  termName: Scalars["String"];
  termVersion: Scalars["Int"];
  agreed: Scalars["Boolean"];
};

export type UpsertMyPatientProfileInput = {
  fullName: Scalars["String"];
  likeName: Scalars["String"];
  birthDate: Scalars["Int"];
  city: Scalars["String"];
  avatar?: Maybe<Scalars["Upload"]>;
};

export type UpsertMyPsychologistProfileInput = {
  fullName: Scalars["String"];
  likeName: Scalars["String"];
  birthDate: Scalars["Int"];
  city: Scalars["String"];
  crp: Scalars["String"];
  whatsapp: Scalars["String"];
  instagram: Scalars["String"];
  bio: Scalars["String"];
  avatar?: Maybe<Scalars["Upload"]>;
};

export type UpsertTermInput = {
  name: Scalars["String"];
  version: Scalars["Int"];
  profileType: TermProfileType;
  active: Scalars["Boolean"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  role: Role;
};

export type AuthenticateUserQueryVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type AuthenticateUserQuery = {
  __typename?: "Query";
  authenticateUser: { __typename?: "Token"; token: string; expiresAt: number };
};

export type CreatePatientUserMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type CreatePatientUserMutation = {
  __typename?: "Mutation";
  createPatientUser?: Maybe<boolean>;
};

export type MyUserQueryVariables = Exact<{ [key: string]: never }>;

export type MyUserQuery = {
  __typename?: "Query";
  myUser: { __typename?: "User"; id: string; email: string; role: Role };
};

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ResetPasswordMutation = {
  __typename?: "Mutation";
  resetPassword?: Maybe<boolean>;
};

export type AssignTreatmentMutationVariables = Exact<{
  id: Scalars["ID"];
  priceRangeName: Scalars["String"];
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
      priceRange?: Maybe<{ __typename?: "TreatmentPriceRange"; name: string }>;
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

export type MyPatientGreetingQueryVariables = Exact<{ [key: string]: never }>;

export type MyPatientGreetingQuery = {
  __typename?: "Query";
  myPatientProfile?: Maybe<{
    __typename?: "PatientProfile";
    id: string;
    likeName: string;
    avatar: string;
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
      }>;
      priceRangeOfferings: Array<{
        __typename?: "TreatmentPriceRangeOffering";
        id: string;
        priceRange?: Maybe<{
          __typename?: "TreatmentPriceRange";
          name: string;
          minimumPrice: number;
          maximumPrice: number;
          eligibleFor: string;
        }>;
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

export type GetCharacteristicMessagesQueryVariables = Exact<{
  lang: Scalars["String"];
  keys: Array<Scalars["String"]> | Scalars["String"];
}>;

export type GetCharacteristicMessagesQuery = {
  __typename?: "Query";
  translations: Array<{
    __typename?: "Translation";
    lang: string;
    key: string;
    value: string;
  }>;
};

export type GetCharacteristicsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCharacteristicsQuery = {
  __typename?: "Query";
  patientCharacteristics: Array<{
    __typename?: "Characteristic";
    name: string;
    type: CharacteristicType;
    possibleValues: Array<string>;
  }>;
  psychologistCharacteristics: Array<{
    __typename?: "Characteristic";
    name: string;
    type: CharacteristicType;
    possibleValues: Array<string>;
  }>;
};

export type GetPatientTermsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPatientTermsQuery = {
  __typename?: "Query";
  patientTerms: Array<{
    __typename?: "Term";
    name: string;
    version: number;
    active: boolean;
  }>;
};

export type GetPsychologistTermsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetPsychologistTermsQuery = {
  __typename?: "Query";
  psychologistTerms: Array<{
    __typename?: "Term";
    name: string;
    version: number;
    active: boolean;
  }>;
};

export type MyPatientProfileQueryVariables = Exact<{ [key: string]: never }>;

export type MyPatientProfileQuery = {
  __typename?: "Query";
  myPatientProfile?: Maybe<{
    __typename?: "PatientProfile";
    id: string;
    fullName: string;
    likeName: string;
    birthDate: number;
    city: string;
    avatar: string;
    characteristics: Array<{
      __typename?: "CharacteristicChoice";
      name: string;
      type: CharacteristicType;
      selectedValues: Array<string>;
    }>;
    preferences: Array<{
      __typename?: "Preference";
      characteristicName: string;
      selectedValue: string;
      weight: number;
    }>;
    agreements: Array<{
      __typename?: "Agreement";
      termName: string;
      termVersion: number;
      signedAt: number;
    }>;
  }>;
};

export type MyPsychologistProfileQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MyPsychologistProfileQuery = {
  __typename?: "Query";
  myPsychologistProfile?: Maybe<{
    __typename?: "PsychologistProfile";
    id: string;
    fullName: string;
    likeName: string;
    birthDate: number;
    city: string;
    crp: string;
    whatsapp: string;
    instagram: string;
    bio: string;
    avatar: string;
    characteristics: Array<{
      __typename?: "CharacteristicChoice";
      name: string;
      type: CharacteristicType;
      selectedValues: Array<string>;
    }>;
    preferences: Array<{
      __typename?: "Preference";
      characteristicName: string;
      selectedValue: string;
      weight: number;
    }>;
    agreements: Array<{
      __typename?: "Agreement";
      termName: string;
      termVersion: number;
      signedAt: number;
    }>;
  }>;
};

export type PsychologistProfileQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PsychologistProfileQuery = {
  __typename?: "Query";
  psychologistProfile?: Maybe<{
    __typename?: "PublicPsychologistProfile";
    id: string;
    fullName: string;
    likeName: string;
    city: string;
    crp: string;
    whatsapp: string;
    instagram: string;
    bio: string;
    avatar: string;
  }>;
};

export type SetMyPatientCharacteristicChoicesAndPreferencesMutationVariables = Exact<{
  choiceInput:
    | Array<SetMyProfileCharacteristicChoiceInput>
    | SetMyProfileCharacteristicChoiceInput;
  weightInput: Array<SetMyProfilePreferenceInput> | SetMyProfilePreferenceInput;
}>;

export type SetMyPatientCharacteristicChoicesAndPreferencesMutation = {
  __typename?: "Mutation";
  setMyPatientCharacteristicChoices?: Maybe<boolean>;
  setMyPatientPreferences?: Maybe<boolean>;
};

export type SetMyPsychologistCharacteristicChoicesAndPreferencesMutationVariables = Exact<{
  choiceInput:
    | Array<SetMyProfileCharacteristicChoiceInput>
    | SetMyProfileCharacteristicChoiceInput;
  weightInput: Array<SetMyProfilePreferenceInput> | SetMyProfilePreferenceInput;
}>;

export type SetMyPsychologistCharacteristicChoicesAndPreferencesMutation = {
  __typename?: "Mutation";
  setMyPsychologistCharacteristicChoices?: Maybe<boolean>;
  setMyPsychologistPreferences?: Maybe<boolean>;
};

export type UpsertMyPatientProfileMutationVariables = Exact<{
  profileInput: UpsertMyPatientProfileInput;
}>;

export type UpsertMyPatientProfileMutation = {
  __typename?: "Mutation";
  upsertMyPatientProfile?: Maybe<boolean>;
};

export type UpsertMyPsychologistProfileMutationVariables = Exact<{
  profileInput: UpsertMyPsychologistProfileInput;
}>;

export type UpsertMyPsychologistProfileMutation = {
  __typename?: "Mutation";
  upsertMyPsychologistProfile?: Maybe<boolean>;
};

export type UpsertPatientAgreementMutationVariables = Exact<{
  agreementInput: UpsertAgreementInput;
}>;

export type UpsertPatientAgreementMutation = {
  __typename?: "Mutation";
  upsertPatientAgreement?: Maybe<boolean>;
};

export type UpsertPsychologistAgreementMutationVariables = Exact<{
  agreementInput: UpsertAgreementInput;
}>;

export type UpsertPsychologistAgreementMutation = {
  __typename?: "Mutation";
  upsertPsychologistAgreement?: Maybe<boolean>;
};

export type CancelAppointmentByPsychologistMutationVariables = Exact<{
  id: Scalars["ID"];
  reason: Scalars["String"];
}>;

export type CancelAppointmentByPsychologistMutation = {
  __typename?: "Mutation";
  cancelAppointmentByPsychologist?: Maybe<boolean>;
};

export type ConfirmAppointmentByPsychologistMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ConfirmAppointmentByPsychologistMutation = {
  __typename?: "Mutation";
  confirmAppointmentByPsychologist?: Maybe<boolean>;
};

export type CreateTreatmentMutationVariables = Exact<{
  frequency: Scalars["Int"];
  phase: Scalars["Int"];
  duration: Scalars["Int"];
  priceRangeName: Scalars["String"];
}>;

export type CreateTreatmentMutation = {
  __typename?: "Mutation";
  createTreatment?: Maybe<boolean>;
};

export type DeleteTreatmentMutationVariables = Exact<{
  id: Scalars["ID"];
  priceRangeName: Scalars["String"];
}>;

export type DeleteTreatmentMutation = {
  __typename?: "Mutation";
  deleteTreatment?: Maybe<boolean>;
};

export type EditAppointmentByPsychologistMutationVariables = Exact<{
  id: Scalars["ID"];
  input: EditAppointmentByPsychologistInput;
}>;

export type EditAppointmentByPsychologistMutation = {
  __typename?: "Mutation";
  editAppointmentByPsychologist?: Maybe<boolean>;
};

export type FinalizeTreatmentMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type FinalizeTreatmentMutation = {
  __typename?: "Mutation";
  finalizeTreatment?: Maybe<boolean>;
};

export type InterruptTreatmentByPsychologistMutationVariables = Exact<{
  id: Scalars["ID"];
  reason: Scalars["String"];
}>;

export type InterruptTreatmentByPsychologistMutation = {
  __typename?: "Mutation";
  interruptTreatmentByPsychologist?: Maybe<boolean>;
};

export type MyPsychologistAppointmentsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MyPsychologistAppointmentsQuery = {
  __typename?: "Query";
  myPsychologistProfile?: Maybe<{
    __typename?: "PsychologistProfile";
    id: string;
    appointments: Array<{
      __typename?: "PsychologistAppointment";
      id: string;
      status: AppointmentStatus;
      start: number;
      end: number;
      priceRange?: Maybe<{
        __typename?: "TreatmentPriceRange";
        name: string;
        minimumPrice: number;
        maximumPrice: number;
      }>;
      treatment: {
        __typename?: "PsychologistTreatment";
        patient?: Maybe<{
          __typename?: "PublicPatientProfile";
          fullName: string;
        }>;
      };
    }>;
  }>;
};

export type MyPsychologistGreetingQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MyPsychologistGreetingQuery = {
  __typename?: "Query";
  myPsychologistProfile?: Maybe<{
    __typename?: "PsychologistProfile";
    id: string;
    likeName: string;
    avatar: string;
  }>;
};

export type MyPsychologistTreatmentsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MyPsychologistTreatmentsQuery = {
  __typename?: "Query";
  myPsychologistProfile?: Maybe<{
    __typename?: "PsychologistProfile";
    id: string;
    likeName: string;
    treatments: Array<{
      __typename?: "PsychologistTreatment";
      id: string;
      status: TreatmentStatus;
      frequency: number;
      phase: number;
      duration: number;
      priceRange?: Maybe<{
        __typename?: "TreatmentPriceRange";
        name: string;
        minimumPrice: number;
        maximumPrice: number;
      }>;
      patient?: Maybe<{
        __typename?: "PublicPatientProfile";
        fullName: string;
      }>;
    }>;
    priceRangeOfferings: Array<{
      __typename?: "TreatmentPriceRangeOffering";
      priceRange?: Maybe<{
        __typename?: "TreatmentPriceRange";
        name: string;
        minimumPrice: number;
        maximumPrice: number;
      }>;
    }>;
  }>;
};

export type TreatmentPriceRangesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type TreatmentPriceRangesQuery = {
  __typename?: "Query";
  treatmentPriceRanges: Array<{
    __typename?: "TreatmentPriceRange";
    name: string;
    minimumPrice: number;
    maximumPrice: number;
    eligibleFor: string;
  }>;
};

export type GetServerTimeQueryVariables = Exact<{ [key: string]: never }>;

export type GetServerTimeQuery = { __typename?: "Query"; time: number };

export const AuthenticateUserDocument = gql`
  query AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(input: { email: $email, password: $password }) {
      token
      expiresAt
    }
  }
`;

/**
 * __useAuthenticateUserQuery__
 *
 * To run a query within a React component, call `useAuthenticateUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthenticateUserQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthenticateUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    AuthenticateUserQuery,
    AuthenticateUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthenticateUserQuery, AuthenticateUserQueryVariables>(
    AuthenticateUserDocument,
    options,
  );
}
export function useAuthenticateUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AuthenticateUserQuery,
    AuthenticateUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AuthenticateUserQuery,
    AuthenticateUserQueryVariables
  >(AuthenticateUserDocument, options);
}
export type AuthenticateUserQueryHookResult = ReturnType<
  typeof useAuthenticateUserQuery
>;
export type AuthenticateUserLazyQueryHookResult = ReturnType<
  typeof useAuthenticateUserLazyQuery
>;
export type AuthenticateUserQueryResult = Apollo.QueryResult<
  AuthenticateUserQuery,
  AuthenticateUserQueryVariables
>;
export const CreatePatientUserDocument = gql`
  mutation CreatePatientUser($email: String!) {
    createPatientUser(input: { email: $email })
  }
`;
export type CreatePatientUserMutationFn = Apollo.MutationFunction<
  CreatePatientUserMutation,
  CreatePatientUserMutationVariables
>;

/**
 * __useCreatePatientUserMutation__
 *
 * To run a mutation, you first call `useCreatePatientUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePatientUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPatientUserMutation, { data, loading, error }] = useCreatePatientUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreatePatientUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePatientUserMutation,
    CreatePatientUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePatientUserMutation,
    CreatePatientUserMutationVariables
  >(CreatePatientUserDocument, options);
}
export type CreatePatientUserMutationHookResult = ReturnType<
  typeof useCreatePatientUserMutation
>;
export type CreatePatientUserMutationResult = Apollo.MutationResult<CreatePatientUserMutation>;
export type CreatePatientUserMutationOptions = Apollo.BaseMutationOptions<
  CreatePatientUserMutation,
  CreatePatientUserMutationVariables
>;
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
export const ResetPasswordDocument = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(input: { token: $token, password: $newPassword })
  }
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const AssignTreatmentDocument = gql`
  mutation AssignTreatment($id: ID!, $priceRangeName: String!) {
    assignTreatment(id: $id, priceRangeName: $priceRangeName)
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
 *      priceRangeName: // value for 'priceRangeName'
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
        priceRange {
          name
        }
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
export const MyPatientGreetingDocument = gql`
  query MyPatientGreeting {
    myPatientProfile {
      id
      likeName
      avatar
    }
  }
`;

/**
 * __useMyPatientGreetingQuery__
 *
 * To run a query within a React component, call `useMyPatientGreetingQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPatientGreetingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPatientGreetingQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPatientGreetingQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyPatientGreetingQuery,
    MyPatientGreetingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MyPatientGreetingQuery,
    MyPatientGreetingQueryVariables
  >(MyPatientGreetingDocument, options);
}
export function useMyPatientGreetingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyPatientGreetingQuery,
    MyPatientGreetingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyPatientGreetingQuery,
    MyPatientGreetingQueryVariables
  >(MyPatientGreetingDocument, options);
}
export type MyPatientGreetingQueryHookResult = ReturnType<
  typeof useMyPatientGreetingQuery
>;
export type MyPatientGreetingLazyQueryHookResult = ReturnType<
  typeof useMyPatientGreetingLazyQuery
>;
export type MyPatientGreetingQueryResult = Apollo.QueryResult<
  MyPatientGreetingQuery,
  MyPatientGreetingQueryVariables
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
        }
        priceRangeOfferings {
          id
          priceRange {
            name
            minimumPrice
            maximumPrice
            eligibleFor
          }
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
export const GetCharacteristicMessagesDocument = gql`
  query GetCharacteristicMessages($lang: String!, $keys: [String!]!) {
    translations(lang: $lang, keys: $keys) {
      lang
      key
      value
    }
  }
`;

/**
 * __useGetCharacteristicMessagesQuery__
 *
 * To run a query within a React component, call `useGetCharacteristicMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharacteristicMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharacteristicMessagesQuery({
 *   variables: {
 *      lang: // value for 'lang'
 *      keys: // value for 'keys'
 *   },
 * });
 */
export function useGetCharacteristicMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCharacteristicMessagesQuery,
    GetCharacteristicMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCharacteristicMessagesQuery,
    GetCharacteristicMessagesQueryVariables
  >(GetCharacteristicMessagesDocument, options);
}
export function useGetCharacteristicMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCharacteristicMessagesQuery,
    GetCharacteristicMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCharacteristicMessagesQuery,
    GetCharacteristicMessagesQueryVariables
  >(GetCharacteristicMessagesDocument, options);
}
export type GetCharacteristicMessagesQueryHookResult = ReturnType<
  typeof useGetCharacteristicMessagesQuery
>;
export type GetCharacteristicMessagesLazyQueryHookResult = ReturnType<
  typeof useGetCharacteristicMessagesLazyQuery
>;
export type GetCharacteristicMessagesQueryResult = Apollo.QueryResult<
  GetCharacteristicMessagesQuery,
  GetCharacteristicMessagesQueryVariables
>;
export const GetCharacteristicsDocument = gql`
  query GetCharacteristics {
    patientCharacteristics {
      name
      type
      possibleValues
    }
    psychologistCharacteristics {
      name
      type
      possibleValues
    }
  }
`;

/**
 * __useGetCharacteristicsQuery__
 *
 * To run a query within a React component, call `useGetCharacteristicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharacteristicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharacteristicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCharacteristicsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCharacteristicsQuery,
    GetCharacteristicsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCharacteristicsQuery,
    GetCharacteristicsQueryVariables
  >(GetCharacteristicsDocument, options);
}
export function useGetCharacteristicsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCharacteristicsQuery,
    GetCharacteristicsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCharacteristicsQuery,
    GetCharacteristicsQueryVariables
  >(GetCharacteristicsDocument, options);
}
export type GetCharacteristicsQueryHookResult = ReturnType<
  typeof useGetCharacteristicsQuery
>;
export type GetCharacteristicsLazyQueryHookResult = ReturnType<
  typeof useGetCharacteristicsLazyQuery
>;
export type GetCharacteristicsQueryResult = Apollo.QueryResult<
  GetCharacteristicsQuery,
  GetCharacteristicsQueryVariables
>;
export const GetPatientTermsDocument = gql`
  query GetPatientTerms {
    patientTerms {
      name
      version
      active
    }
  }
`;

/**
 * __useGetPatientTermsQuery__
 *
 * To run a query within a React component, call `useGetPatientTermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPatientTermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPatientTermsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPatientTermsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPatientTermsQuery,
    GetPatientTermsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPatientTermsQuery, GetPatientTermsQueryVariables>(
    GetPatientTermsDocument,
    options,
  );
}
export function useGetPatientTermsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPatientTermsQuery,
    GetPatientTermsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPatientTermsQuery,
    GetPatientTermsQueryVariables
  >(GetPatientTermsDocument, options);
}
export type GetPatientTermsQueryHookResult = ReturnType<
  typeof useGetPatientTermsQuery
>;
export type GetPatientTermsLazyQueryHookResult = ReturnType<
  typeof useGetPatientTermsLazyQuery
>;
export type GetPatientTermsQueryResult = Apollo.QueryResult<
  GetPatientTermsQuery,
  GetPatientTermsQueryVariables
>;
export const GetPsychologistTermsDocument = gql`
  query GetPsychologistTerms {
    psychologistTerms {
      name
      version
      active
    }
  }
`;

/**
 * __useGetPsychologistTermsQuery__
 *
 * To run a query within a React component, call `useGetPsychologistTermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPsychologistTermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPsychologistTermsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPsychologistTermsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPsychologistTermsQuery,
    GetPsychologistTermsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetPsychologistTermsQuery,
    GetPsychologistTermsQueryVariables
  >(GetPsychologistTermsDocument, options);
}
export function useGetPsychologistTermsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPsychologistTermsQuery,
    GetPsychologistTermsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPsychologistTermsQuery,
    GetPsychologistTermsQueryVariables
  >(GetPsychologistTermsDocument, options);
}
export type GetPsychologistTermsQueryHookResult = ReturnType<
  typeof useGetPsychologistTermsQuery
>;
export type GetPsychologistTermsLazyQueryHookResult = ReturnType<
  typeof useGetPsychologistTermsLazyQuery
>;
export type GetPsychologistTermsQueryResult = Apollo.QueryResult<
  GetPsychologistTermsQuery,
  GetPsychologistTermsQueryVariables
>;
export const MyPatientProfileDocument = gql`
  query MyPatientProfile {
    myPatientProfile {
      id
      fullName
      likeName
      birthDate
      city
      avatar
      characteristics {
        name
        type
        selectedValues
      }
      preferences {
        characteristicName
        selectedValue
        weight
      }
      agreements {
        termName
        termVersion
        signedAt
      }
    }
  }
`;

/**
 * __useMyPatientProfileQuery__
 *
 * To run a query within a React component, call `useMyPatientProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPatientProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPatientProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPatientProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyPatientProfileQuery,
    MyPatientProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyPatientProfileQuery, MyPatientProfileQueryVariables>(
    MyPatientProfileDocument,
    options,
  );
}
export function useMyPatientProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyPatientProfileQuery,
    MyPatientProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyPatientProfileQuery,
    MyPatientProfileQueryVariables
  >(MyPatientProfileDocument, options);
}
export type MyPatientProfileQueryHookResult = ReturnType<
  typeof useMyPatientProfileQuery
>;
export type MyPatientProfileLazyQueryHookResult = ReturnType<
  typeof useMyPatientProfileLazyQuery
>;
export type MyPatientProfileQueryResult = Apollo.QueryResult<
  MyPatientProfileQuery,
  MyPatientProfileQueryVariables
>;
export const MyPsychologistProfileDocument = gql`
  query MyPsychologistProfile {
    myPsychologistProfile {
      id
      fullName
      likeName
      birthDate
      city
      crp
      whatsapp
      instagram
      bio
      avatar
      characteristics {
        name
        type
        selectedValues
      }
      preferences {
        characteristicName
        selectedValue
        weight
      }
      agreements {
        termName
        termVersion
        signedAt
      }
    }
  }
`;

/**
 * __useMyPsychologistProfileQuery__
 *
 * To run a query within a React component, call `useMyPsychologistProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPsychologistProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPsychologistProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPsychologistProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyPsychologistProfileQuery,
    MyPsychologistProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MyPsychologistProfileQuery,
    MyPsychologistProfileQueryVariables
  >(MyPsychologistProfileDocument, options);
}
export function useMyPsychologistProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyPsychologistProfileQuery,
    MyPsychologistProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyPsychologistProfileQuery,
    MyPsychologistProfileQueryVariables
  >(MyPsychologistProfileDocument, options);
}
export type MyPsychologistProfileQueryHookResult = ReturnType<
  typeof useMyPsychologistProfileQuery
>;
export type MyPsychologistProfileLazyQueryHookResult = ReturnType<
  typeof useMyPsychologistProfileLazyQuery
>;
export type MyPsychologistProfileQueryResult = Apollo.QueryResult<
  MyPsychologistProfileQuery,
  MyPsychologistProfileQueryVariables
>;
export const PsychologistProfileDocument = gql`
  query PsychologistProfile($id: ID!) {
    psychologistProfile(id: $id) {
      id
      fullName
      likeName
      city
      crp
      whatsapp
      instagram
      bio
      avatar
    }
  }
`;

/**
 * __usePsychologistProfileQuery__
 *
 * To run a query within a React component, call `usePsychologistProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `usePsychologistProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePsychologistProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePsychologistProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    PsychologistProfileQuery,
    PsychologistProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PsychologistProfileQuery,
    PsychologistProfileQueryVariables
  >(PsychologistProfileDocument, options);
}
export function usePsychologistProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PsychologistProfileQuery,
    PsychologistProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PsychologistProfileQuery,
    PsychologistProfileQueryVariables
  >(PsychologistProfileDocument, options);
}
export type PsychologistProfileQueryHookResult = ReturnType<
  typeof usePsychologistProfileQuery
>;
export type PsychologistProfileLazyQueryHookResult = ReturnType<
  typeof usePsychologistProfileLazyQuery
>;
export type PsychologistProfileQueryResult = Apollo.QueryResult<
  PsychologistProfileQuery,
  PsychologistProfileQueryVariables
>;
export const SetMyPatientCharacteristicChoicesAndPreferencesDocument = gql`
  mutation SetMyPatientCharacteristicChoicesAndPreferences(
    $choiceInput: [SetMyProfileCharacteristicChoiceInput!]!
    $weightInput: [SetMyProfilePreferenceInput!]!
  ) {
    setMyPatientCharacteristicChoices(input: $choiceInput)
    setMyPatientPreferences(input: $weightInput)
  }
`;
export type SetMyPatientCharacteristicChoicesAndPreferencesMutationFn = Apollo.MutationFunction<
  SetMyPatientCharacteristicChoicesAndPreferencesMutation,
  SetMyPatientCharacteristicChoicesAndPreferencesMutationVariables
>;

/**
 * __useSetMyPatientCharacteristicChoicesAndPreferencesMutation__
 *
 * To run a mutation, you first call `useSetMyPatientCharacteristicChoicesAndPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMyPatientCharacteristicChoicesAndPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMyPatientCharacteristicChoicesAndPreferencesMutation, { data, loading, error }] = useSetMyPatientCharacteristicChoicesAndPreferencesMutation({
 *   variables: {
 *      choiceInput: // value for 'choiceInput'
 *      weightInput: // value for 'weightInput'
 *   },
 * });
 */
export function useSetMyPatientCharacteristicChoicesAndPreferencesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetMyPatientCharacteristicChoicesAndPreferencesMutation,
    SetMyPatientCharacteristicChoicesAndPreferencesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetMyPatientCharacteristicChoicesAndPreferencesMutation,
    SetMyPatientCharacteristicChoicesAndPreferencesMutationVariables
  >(SetMyPatientCharacteristicChoicesAndPreferencesDocument, options);
}
export type SetMyPatientCharacteristicChoicesAndPreferencesMutationHookResult = ReturnType<
  typeof useSetMyPatientCharacteristicChoicesAndPreferencesMutation
>;
export type SetMyPatientCharacteristicChoicesAndPreferencesMutationResult = Apollo.MutationResult<SetMyPatientCharacteristicChoicesAndPreferencesMutation>;
export type SetMyPatientCharacteristicChoicesAndPreferencesMutationOptions = Apollo.BaseMutationOptions<
  SetMyPatientCharacteristicChoicesAndPreferencesMutation,
  SetMyPatientCharacteristicChoicesAndPreferencesMutationVariables
>;
export const SetMyPsychologistCharacteristicChoicesAndPreferencesDocument = gql`
  mutation SetMyPsychologistCharacteristicChoicesAndPreferences(
    $choiceInput: [SetMyProfileCharacteristicChoiceInput!]!
    $weightInput: [SetMyProfilePreferenceInput!]!
  ) {
    setMyPsychologistCharacteristicChoices(input: $choiceInput)
    setMyPsychologistPreferences(input: $weightInput)
  }
`;
export type SetMyPsychologistCharacteristicChoicesAndPreferencesMutationFn = Apollo.MutationFunction<
  SetMyPsychologistCharacteristicChoicesAndPreferencesMutation,
  SetMyPsychologistCharacteristicChoicesAndPreferencesMutationVariables
>;

/**
 * __useSetMyPsychologistCharacteristicChoicesAndPreferencesMutation__
 *
 * To run a mutation, you first call `useSetMyPsychologistCharacteristicChoicesAndPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMyPsychologistCharacteristicChoicesAndPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMyPsychologistCharacteristicChoicesAndPreferencesMutation, { data, loading, error }] = useSetMyPsychologistCharacteristicChoicesAndPreferencesMutation({
 *   variables: {
 *      choiceInput: // value for 'choiceInput'
 *      weightInput: // value for 'weightInput'
 *   },
 * });
 */
export function useSetMyPsychologistCharacteristicChoicesAndPreferencesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetMyPsychologistCharacteristicChoicesAndPreferencesMutation,
    SetMyPsychologistCharacteristicChoicesAndPreferencesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetMyPsychologistCharacteristicChoicesAndPreferencesMutation,
    SetMyPsychologistCharacteristicChoicesAndPreferencesMutationVariables
  >(SetMyPsychologistCharacteristicChoicesAndPreferencesDocument, options);
}
export type SetMyPsychologistCharacteristicChoicesAndPreferencesMutationHookResult = ReturnType<
  typeof useSetMyPsychologistCharacteristicChoicesAndPreferencesMutation
>;
export type SetMyPsychologistCharacteristicChoicesAndPreferencesMutationResult = Apollo.MutationResult<SetMyPsychologistCharacteristicChoicesAndPreferencesMutation>;
export type SetMyPsychologistCharacteristicChoicesAndPreferencesMutationOptions = Apollo.BaseMutationOptions<
  SetMyPsychologistCharacteristicChoicesAndPreferencesMutation,
  SetMyPsychologistCharacteristicChoicesAndPreferencesMutationVariables
>;
export const UpsertMyPatientProfileDocument = gql`
  mutation UpsertMyPatientProfile($profileInput: UpsertMyPatientProfileInput!) {
    upsertMyPatientProfile(input: $profileInput)
  }
`;
export type UpsertMyPatientProfileMutationFn = Apollo.MutationFunction<
  UpsertMyPatientProfileMutation,
  UpsertMyPatientProfileMutationVariables
>;

/**
 * __useUpsertMyPatientProfileMutation__
 *
 * To run a mutation, you first call `useUpsertMyPatientProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertMyPatientProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertMyPatientProfileMutation, { data, loading, error }] = useUpsertMyPatientProfileMutation({
 *   variables: {
 *      profileInput: // value for 'profileInput'
 *   },
 * });
 */
export function useUpsertMyPatientProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertMyPatientProfileMutation,
    UpsertMyPatientProfileMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertMyPatientProfileMutation,
    UpsertMyPatientProfileMutationVariables
  >(UpsertMyPatientProfileDocument, options);
}
export type UpsertMyPatientProfileMutationHookResult = ReturnType<
  typeof useUpsertMyPatientProfileMutation
>;
export type UpsertMyPatientProfileMutationResult = Apollo.MutationResult<UpsertMyPatientProfileMutation>;
export type UpsertMyPatientProfileMutationOptions = Apollo.BaseMutationOptions<
  UpsertMyPatientProfileMutation,
  UpsertMyPatientProfileMutationVariables
>;
export const UpsertMyPsychologistProfileDocument = gql`
  mutation UpsertMyPsychologistProfile(
    $profileInput: UpsertMyPsychologistProfileInput!
  ) {
    upsertMyPsychologistProfile(input: $profileInput)
  }
`;
export type UpsertMyPsychologistProfileMutationFn = Apollo.MutationFunction<
  UpsertMyPsychologistProfileMutation,
  UpsertMyPsychologistProfileMutationVariables
>;

/**
 * __useUpsertMyPsychologistProfileMutation__
 *
 * To run a mutation, you first call `useUpsertMyPsychologistProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertMyPsychologistProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertMyPsychologistProfileMutation, { data, loading, error }] = useUpsertMyPsychologistProfileMutation({
 *   variables: {
 *      profileInput: // value for 'profileInput'
 *   },
 * });
 */
export function useUpsertMyPsychologistProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertMyPsychologistProfileMutation,
    UpsertMyPsychologistProfileMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertMyPsychologistProfileMutation,
    UpsertMyPsychologistProfileMutationVariables
  >(UpsertMyPsychologistProfileDocument, options);
}
export type UpsertMyPsychologistProfileMutationHookResult = ReturnType<
  typeof useUpsertMyPsychologistProfileMutation
>;
export type UpsertMyPsychologistProfileMutationResult = Apollo.MutationResult<UpsertMyPsychologistProfileMutation>;
export type UpsertMyPsychologistProfileMutationOptions = Apollo.BaseMutationOptions<
  UpsertMyPsychologistProfileMutation,
  UpsertMyPsychologistProfileMutationVariables
>;
export const UpsertPatientAgreementDocument = gql`
  mutation UpsertPatientAgreement($agreementInput: UpsertAgreementInput!) {
    upsertPatientAgreement(input: $agreementInput)
  }
`;
export type UpsertPatientAgreementMutationFn = Apollo.MutationFunction<
  UpsertPatientAgreementMutation,
  UpsertPatientAgreementMutationVariables
>;

/**
 * __useUpsertPatientAgreementMutation__
 *
 * To run a mutation, you first call `useUpsertPatientAgreementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertPatientAgreementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertPatientAgreementMutation, { data, loading, error }] = useUpsertPatientAgreementMutation({
 *   variables: {
 *      agreementInput: // value for 'agreementInput'
 *   },
 * });
 */
export function useUpsertPatientAgreementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertPatientAgreementMutation,
    UpsertPatientAgreementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertPatientAgreementMutation,
    UpsertPatientAgreementMutationVariables
  >(UpsertPatientAgreementDocument, options);
}
export type UpsertPatientAgreementMutationHookResult = ReturnType<
  typeof useUpsertPatientAgreementMutation
>;
export type UpsertPatientAgreementMutationResult = Apollo.MutationResult<UpsertPatientAgreementMutation>;
export type UpsertPatientAgreementMutationOptions = Apollo.BaseMutationOptions<
  UpsertPatientAgreementMutation,
  UpsertPatientAgreementMutationVariables
>;
export const UpsertPsychologistAgreementDocument = gql`
  mutation UpsertPsychologistAgreement($agreementInput: UpsertAgreementInput!) {
    upsertPsychologistAgreement(input: $agreementInput)
  }
`;
export type UpsertPsychologistAgreementMutationFn = Apollo.MutationFunction<
  UpsertPsychologistAgreementMutation,
  UpsertPsychologistAgreementMutationVariables
>;

/**
 * __useUpsertPsychologistAgreementMutation__
 *
 * To run a mutation, you first call `useUpsertPsychologistAgreementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertPsychologistAgreementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertPsychologistAgreementMutation, { data, loading, error }] = useUpsertPsychologistAgreementMutation({
 *   variables: {
 *      agreementInput: // value for 'agreementInput'
 *   },
 * });
 */
export function useUpsertPsychologistAgreementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertPsychologistAgreementMutation,
    UpsertPsychologistAgreementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertPsychologistAgreementMutation,
    UpsertPsychologistAgreementMutationVariables
  >(UpsertPsychologistAgreementDocument, options);
}
export type UpsertPsychologistAgreementMutationHookResult = ReturnType<
  typeof useUpsertPsychologistAgreementMutation
>;
export type UpsertPsychologistAgreementMutationResult = Apollo.MutationResult<UpsertPsychologistAgreementMutation>;
export type UpsertPsychologistAgreementMutationOptions = Apollo.BaseMutationOptions<
  UpsertPsychologistAgreementMutation,
  UpsertPsychologistAgreementMutationVariables
>;
export const CancelAppointmentByPsychologistDocument = gql`
  mutation CancelAppointmentByPsychologist($id: ID!, $reason: String!) {
    cancelAppointmentByPsychologist(id: $id, reason: $reason)
  }
`;
export type CancelAppointmentByPsychologistMutationFn = Apollo.MutationFunction<
  CancelAppointmentByPsychologistMutation,
  CancelAppointmentByPsychologistMutationVariables
>;

/**
 * __useCancelAppointmentByPsychologistMutation__
 *
 * To run a mutation, you first call `useCancelAppointmentByPsychologistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelAppointmentByPsychologistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelAppointmentByPsychologistMutation, { data, loading, error }] = useCancelAppointmentByPsychologistMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useCancelAppointmentByPsychologistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CancelAppointmentByPsychologistMutation,
    CancelAppointmentByPsychologistMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CancelAppointmentByPsychologistMutation,
    CancelAppointmentByPsychologistMutationVariables
  >(CancelAppointmentByPsychologistDocument, options);
}
export type CancelAppointmentByPsychologistMutationHookResult = ReturnType<
  typeof useCancelAppointmentByPsychologistMutation
>;
export type CancelAppointmentByPsychologistMutationResult = Apollo.MutationResult<CancelAppointmentByPsychologistMutation>;
export type CancelAppointmentByPsychologistMutationOptions = Apollo.BaseMutationOptions<
  CancelAppointmentByPsychologistMutation,
  CancelAppointmentByPsychologistMutationVariables
>;
export const ConfirmAppointmentByPsychologistDocument = gql`
  mutation ConfirmAppointmentByPsychologist($id: ID!) {
    confirmAppointmentByPsychologist(id: $id)
  }
`;
export type ConfirmAppointmentByPsychologistMutationFn = Apollo.MutationFunction<
  ConfirmAppointmentByPsychologistMutation,
  ConfirmAppointmentByPsychologistMutationVariables
>;

/**
 * __useConfirmAppointmentByPsychologistMutation__
 *
 * To run a mutation, you first call `useConfirmAppointmentByPsychologistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmAppointmentByPsychologistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmAppointmentByPsychologistMutation, { data, loading, error }] = useConfirmAppointmentByPsychologistMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useConfirmAppointmentByPsychologistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmAppointmentByPsychologistMutation,
    ConfirmAppointmentByPsychologistMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmAppointmentByPsychologistMutation,
    ConfirmAppointmentByPsychologistMutationVariables
  >(ConfirmAppointmentByPsychologistDocument, options);
}
export type ConfirmAppointmentByPsychologistMutationHookResult = ReturnType<
  typeof useConfirmAppointmentByPsychologistMutation
>;
export type ConfirmAppointmentByPsychologistMutationResult = Apollo.MutationResult<ConfirmAppointmentByPsychologistMutation>;
export type ConfirmAppointmentByPsychologistMutationOptions = Apollo.BaseMutationOptions<
  ConfirmAppointmentByPsychologistMutation,
  ConfirmAppointmentByPsychologistMutationVariables
>;
export const CreateTreatmentDocument = gql`
  mutation CreateTreatment(
    $frequency: Int!
    $phase: Int!
    $duration: Int!
    $priceRangeName: String!
  ) {
    createTreatment(
      input: {
        frequency: $frequency
        phase: $phase
        duration: $duration
        priceRangeName: $priceRangeName
      }
    )
  }
`;
export type CreateTreatmentMutationFn = Apollo.MutationFunction<
  CreateTreatmentMutation,
  CreateTreatmentMutationVariables
>;

/**
 * __useCreateTreatmentMutation__
 *
 * To run a mutation, you first call `useCreateTreatmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTreatmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTreatmentMutation, { data, loading, error }] = useCreateTreatmentMutation({
 *   variables: {
 *      frequency: // value for 'frequency'
 *      phase: // value for 'phase'
 *      duration: // value for 'duration'
 *      priceRangeName: // value for 'priceRangeName'
 *   },
 * });
 */
export function useCreateTreatmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTreatmentMutation,
    CreateTreatmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTreatmentMutation,
    CreateTreatmentMutationVariables
  >(CreateTreatmentDocument, options);
}
export type CreateTreatmentMutationHookResult = ReturnType<
  typeof useCreateTreatmentMutation
>;
export type CreateTreatmentMutationResult = Apollo.MutationResult<CreateTreatmentMutation>;
export type CreateTreatmentMutationOptions = Apollo.BaseMutationOptions<
  CreateTreatmentMutation,
  CreateTreatmentMutationVariables
>;
export const DeleteTreatmentDocument = gql`
  mutation DeleteTreatment($id: ID!, $priceRangeName: String!) {
    deleteTreatment(id: $id, priceRangeName: $priceRangeName)
  }
`;
export type DeleteTreatmentMutationFn = Apollo.MutationFunction<
  DeleteTreatmentMutation,
  DeleteTreatmentMutationVariables
>;

/**
 * __useDeleteTreatmentMutation__
 *
 * To run a mutation, you first call `useDeleteTreatmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTreatmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTreatmentMutation, { data, loading, error }] = useDeleteTreatmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      priceRangeName: // value for 'priceRangeName'
 *   },
 * });
 */
export function useDeleteTreatmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTreatmentMutation,
    DeleteTreatmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteTreatmentMutation,
    DeleteTreatmentMutationVariables
  >(DeleteTreatmentDocument, options);
}
export type DeleteTreatmentMutationHookResult = ReturnType<
  typeof useDeleteTreatmentMutation
>;
export type DeleteTreatmentMutationResult = Apollo.MutationResult<DeleteTreatmentMutation>;
export type DeleteTreatmentMutationOptions = Apollo.BaseMutationOptions<
  DeleteTreatmentMutation,
  DeleteTreatmentMutationVariables
>;
export const EditAppointmentByPsychologistDocument = gql`
  mutation EditAppointmentByPsychologist(
    $id: ID!
    $input: EditAppointmentByPsychologistInput!
  ) {
    editAppointmentByPsychologist(id: $id, input: $input)
  }
`;
export type EditAppointmentByPsychologistMutationFn = Apollo.MutationFunction<
  EditAppointmentByPsychologistMutation,
  EditAppointmentByPsychologistMutationVariables
>;

/**
 * __useEditAppointmentByPsychologistMutation__
 *
 * To run a mutation, you first call `useEditAppointmentByPsychologistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAppointmentByPsychologistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAppointmentByPsychologistMutation, { data, loading, error }] = useEditAppointmentByPsychologistMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditAppointmentByPsychologistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditAppointmentByPsychologistMutation,
    EditAppointmentByPsychologistMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EditAppointmentByPsychologistMutation,
    EditAppointmentByPsychologistMutationVariables
  >(EditAppointmentByPsychologistDocument, options);
}
export type EditAppointmentByPsychologistMutationHookResult = ReturnType<
  typeof useEditAppointmentByPsychologistMutation
>;
export type EditAppointmentByPsychologistMutationResult = Apollo.MutationResult<EditAppointmentByPsychologistMutation>;
export type EditAppointmentByPsychologistMutationOptions = Apollo.BaseMutationOptions<
  EditAppointmentByPsychologistMutation,
  EditAppointmentByPsychologistMutationVariables
>;
export const FinalizeTreatmentDocument = gql`
  mutation FinalizeTreatment($id: ID!) {
    finalizeTreatment(id: $id)
  }
`;
export type FinalizeTreatmentMutationFn = Apollo.MutationFunction<
  FinalizeTreatmentMutation,
  FinalizeTreatmentMutationVariables
>;

/**
 * __useFinalizeTreatmentMutation__
 *
 * To run a mutation, you first call `useFinalizeTreatmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinalizeTreatmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finalizeTreatmentMutation, { data, loading, error }] = useFinalizeTreatmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFinalizeTreatmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FinalizeTreatmentMutation,
    FinalizeTreatmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    FinalizeTreatmentMutation,
    FinalizeTreatmentMutationVariables
  >(FinalizeTreatmentDocument, options);
}
export type FinalizeTreatmentMutationHookResult = ReturnType<
  typeof useFinalizeTreatmentMutation
>;
export type FinalizeTreatmentMutationResult = Apollo.MutationResult<FinalizeTreatmentMutation>;
export type FinalizeTreatmentMutationOptions = Apollo.BaseMutationOptions<
  FinalizeTreatmentMutation,
  FinalizeTreatmentMutationVariables
>;
export const InterruptTreatmentByPsychologistDocument = gql`
  mutation InterruptTreatmentByPsychologist($id: ID!, $reason: String!) {
    interruptTreatmentByPsychologist(id: $id, reason: $reason)
  }
`;
export type InterruptTreatmentByPsychologistMutationFn = Apollo.MutationFunction<
  InterruptTreatmentByPsychologistMutation,
  InterruptTreatmentByPsychologistMutationVariables
>;

/**
 * __useInterruptTreatmentByPsychologistMutation__
 *
 * To run a mutation, you first call `useInterruptTreatmentByPsychologistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInterruptTreatmentByPsychologistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [interruptTreatmentByPsychologistMutation, { data, loading, error }] = useInterruptTreatmentByPsychologistMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useInterruptTreatmentByPsychologistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InterruptTreatmentByPsychologistMutation,
    InterruptTreatmentByPsychologistMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InterruptTreatmentByPsychologistMutation,
    InterruptTreatmentByPsychologistMutationVariables
  >(InterruptTreatmentByPsychologistDocument, options);
}
export type InterruptTreatmentByPsychologistMutationHookResult = ReturnType<
  typeof useInterruptTreatmentByPsychologistMutation
>;
export type InterruptTreatmentByPsychologistMutationResult = Apollo.MutationResult<InterruptTreatmentByPsychologistMutation>;
export type InterruptTreatmentByPsychologistMutationOptions = Apollo.BaseMutationOptions<
  InterruptTreatmentByPsychologistMutation,
  InterruptTreatmentByPsychologistMutationVariables
>;
export const MyPsychologistAppointmentsDocument = gql`
  query MyPsychologistAppointments {
    myPsychologistProfile {
      id
      appointments {
        id
        status
        start
        end
        priceRange {
          name
          minimumPrice
          maximumPrice
        }
        treatment {
          patient {
            fullName
          }
        }
      }
    }
  }
`;

/**
 * __useMyPsychologistAppointmentsQuery__
 *
 * To run a query within a React component, call `useMyPsychologistAppointmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPsychologistAppointmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPsychologistAppointmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPsychologistAppointmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyPsychologistAppointmentsQuery,
    MyPsychologistAppointmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MyPsychologistAppointmentsQuery,
    MyPsychologistAppointmentsQueryVariables
  >(MyPsychologistAppointmentsDocument, options);
}
export function useMyPsychologistAppointmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyPsychologistAppointmentsQuery,
    MyPsychologistAppointmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyPsychologistAppointmentsQuery,
    MyPsychologistAppointmentsQueryVariables
  >(MyPsychologistAppointmentsDocument, options);
}
export type MyPsychologistAppointmentsQueryHookResult = ReturnType<
  typeof useMyPsychologistAppointmentsQuery
>;
export type MyPsychologistAppointmentsLazyQueryHookResult = ReturnType<
  typeof useMyPsychologistAppointmentsLazyQuery
>;
export type MyPsychologistAppointmentsQueryResult = Apollo.QueryResult<
  MyPsychologistAppointmentsQuery,
  MyPsychologistAppointmentsQueryVariables
>;
export const MyPsychologistGreetingDocument = gql`
  query MyPsychologistGreeting {
    myPsychologistProfile {
      id
      likeName
      avatar
    }
  }
`;

/**
 * __useMyPsychologistGreetingQuery__
 *
 * To run a query within a React component, call `useMyPsychologistGreetingQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPsychologistGreetingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPsychologistGreetingQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPsychologistGreetingQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyPsychologistGreetingQuery,
    MyPsychologistGreetingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MyPsychologistGreetingQuery,
    MyPsychologistGreetingQueryVariables
  >(MyPsychologistGreetingDocument, options);
}
export function useMyPsychologistGreetingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyPsychologistGreetingQuery,
    MyPsychologistGreetingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyPsychologistGreetingQuery,
    MyPsychologistGreetingQueryVariables
  >(MyPsychologistGreetingDocument, options);
}
export type MyPsychologistGreetingQueryHookResult = ReturnType<
  typeof useMyPsychologistGreetingQuery
>;
export type MyPsychologistGreetingLazyQueryHookResult = ReturnType<
  typeof useMyPsychologistGreetingLazyQuery
>;
export type MyPsychologistGreetingQueryResult = Apollo.QueryResult<
  MyPsychologistGreetingQuery,
  MyPsychologistGreetingQueryVariables
>;
export const MyPsychologistTreatmentsDocument = gql`
  query MyPsychologistTreatments {
    myPsychologistProfile {
      id
      likeName
      treatments {
        id
        status
        frequency
        phase
        duration
        priceRange {
          name
          minimumPrice
          maximumPrice
        }
        patient {
          fullName
        }
      }
      priceRangeOfferings {
        priceRange {
          name
          minimumPrice
          maximumPrice
        }
      }
    }
  }
`;

/**
 * __useMyPsychologistTreatmentsQuery__
 *
 * To run a query within a React component, call `useMyPsychologistTreatmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPsychologistTreatmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPsychologistTreatmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPsychologistTreatmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyPsychologistTreatmentsQuery,
    MyPsychologistTreatmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    MyPsychologistTreatmentsQuery,
    MyPsychologistTreatmentsQueryVariables
  >(MyPsychologistTreatmentsDocument, options);
}
export function useMyPsychologistTreatmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyPsychologistTreatmentsQuery,
    MyPsychologistTreatmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MyPsychologistTreatmentsQuery,
    MyPsychologistTreatmentsQueryVariables
  >(MyPsychologistTreatmentsDocument, options);
}
export type MyPsychologistTreatmentsQueryHookResult = ReturnType<
  typeof useMyPsychologistTreatmentsQuery
>;
export type MyPsychologistTreatmentsLazyQueryHookResult = ReturnType<
  typeof useMyPsychologistTreatmentsLazyQuery
>;
export type MyPsychologistTreatmentsQueryResult = Apollo.QueryResult<
  MyPsychologistTreatmentsQuery,
  MyPsychologistTreatmentsQueryVariables
>;
export const TreatmentPriceRangesDocument = gql`
  query TreatmentPriceRanges {
    treatmentPriceRanges {
      name
      minimumPrice
      maximumPrice
      eligibleFor
    }
  }
`;

/**
 * __useTreatmentPriceRangesQuery__
 *
 * To run a query within a React component, call `useTreatmentPriceRangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTreatmentPriceRangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTreatmentPriceRangesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTreatmentPriceRangesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TreatmentPriceRangesQuery,
    TreatmentPriceRangesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    TreatmentPriceRangesQuery,
    TreatmentPriceRangesQueryVariables
  >(TreatmentPriceRangesDocument, options);
}
export function useTreatmentPriceRangesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TreatmentPriceRangesQuery,
    TreatmentPriceRangesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TreatmentPriceRangesQuery,
    TreatmentPriceRangesQueryVariables
  >(TreatmentPriceRangesDocument, options);
}
export type TreatmentPriceRangesQueryHookResult = ReturnType<
  typeof useTreatmentPriceRangesQuery
>;
export type TreatmentPriceRangesLazyQueryHookResult = ReturnType<
  typeof useTreatmentPriceRangesLazyQuery
>;
export type TreatmentPriceRangesQueryResult = Apollo.QueryResult<
  TreatmentPriceRangesQuery,
  TreatmentPriceRangesQueryVariables
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
