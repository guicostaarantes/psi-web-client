import { useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Role } from "@psi/auth/constants/roles";
import {
  GetOwnUser,
  GetOwnUserResponse,
} from "@psi/auth/hooks/usePagePermission/graphql";

interface usePagePermissionArgs {
  requiresAuth: boolean;
  requiresRole?: Role[];
}

interface usePagePermissionReturn {
  pageStatus: string;
}

const usePagePermission = ({
  requiresAuth,
  requiresRole = ["COORDINATOR", "PSYCHOLOGIST", "PATIENT"],
}: usePagePermissionArgs): usePagePermissionReturn => {
  const router = useRouter();

  const pageStatus = useState("loading");

  const { client, data, error } = useQuery<GetOwnUserResponse>(GetOwnUser, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (error) {
      // If GetOwnUser returns error, clear token and apollo cache
      localStorage.removeItem("token");
      client.cache.reset();
      if (requiresAuth) {
        // If GetOwnUser returns error and page requires auth, send to login page
        router
          .push("/login")
          .then(() => pageStatus.set("ready"))
          .catch((err) => console.error(err));
      } else {
        // If GetOwnUser returns error but no auth is required, show page
        pageStatus.set("ready");
      }
    } else if (data) {
      if (!requiresRole.includes(data.getOwnUser.role)) {
        // If GetOwnUser returns user but with forbidden role, shows 404
        pageStatus.set("notFound");
      } else {
        // If user and role checks passed and no additional check is needed, show the page
        pageStatus.set("ready");
      }
    }
  }, [data, error]);

  return {
    pageStatus: pageStatus.value,
  };
};

export default usePagePermission;
