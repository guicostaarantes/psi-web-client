import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import { Role } from "@psi/auth/constants/roles";
import {
  GetOwnPatientProfile,
  GetOwnPatientProfileResponse,
  GetOwnUser,
  GetOwnUserResponse,
} from "@psi/auth/hooks/usePagePermission/graphql";

interface usePagePermissionArgs {
  requiresAuth?: boolean;
  requiresPatientProfile?: boolean;
  requiresRole?: Role[];
}

interface usePagePermissionReturn {
  pageStatus: string;
}

const usePagePermission = ({
  requiresAuth = false,
  requiresPatientProfile = false,
  requiresRole = ["COORDINATOR", "PSYCHOLOGIST", "PATIENT"],
}: usePagePermissionArgs): usePagePermissionReturn => {
  const router = useRouter();

  const pageStatus = useState("loading");

  const [getOwnUser, { data, error }] = useLazyQuery<GetOwnUserResponse>(
    GetOwnUser,
  );

  useEffect(() => {
    if (requiresAuth) {
      // If page requires authenticated user, get information from server
      getOwnUser();
    } else {
      // If page does not require authenticated user, show it without further checks
      pageStatus.set("ready");
    }
  }, []);

  useEffect(() => {
    if (error) {
      // If getOwnUser returns error, erase token and send back to login page
      localStorage.removeItem("token");
      router.push("/login").then(() => pageStatus.set("ready"));
    } else if (data) {
      if (!requiresRole.includes(data.getOwnUser.role)) {
        // If getOwnUser returns user but with forbidden role, shows 404
        pageStatus.set("notFound");
      } else if (!requiresPatientProfile) {
        // If user and role checks passed and no additional check is needed, show the page
        pageStatus.set("ready");
      }
    }
  }, [data, error]);

  const [
    getOwnPatientProfile,
    { error: patientProfileError, loading: patientProfileLoading },
  ] = useLazyQuery<GetOwnPatientProfileResponse>(GetOwnPatientProfile);

  const hasGetOwnPatientProfileRun = useRef(false);

  useEffect(() => {
    if (data && requiresPatientProfile) {
      // If page requires authenticated user and patient profile, get information from server
      getOwnPatientProfile();
      hasGetOwnPatientProfileRun.current = true;
    }
  }, [data]);

  useEffect(() => {
    if (hasGetOwnPatientProfileRun.current && !patientProfileLoading) {
      // Only run after patient profile is retrieved from server
      if (patientProfileError) {
        // If getOwnPatientProfile returns error, send user to patient profile creator page
        router.push("/paciente").then(() => pageStatus.set("ready"));
      } else {
        // If getOwnPatientProfile returns profile and no additional check is needes, show the page
        pageStatus.set("ready");
      }
    }
  }, [patientProfileError, patientProfileLoading]);

  return {
    pageStatus: pageStatus.value,
  };
};

export default usePagePermission;
