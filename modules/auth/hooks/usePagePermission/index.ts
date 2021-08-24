import { useState } from "@hookstate/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Role, useMyUserQuery } from "@psi/shared/graphql";

interface usePagePermissionArgs {
  requiresAuth: boolean;
  requiresRole?: Role[];
}

interface usePagePermissionReturn {
  pageStatus: string;
}

const usePagePermission = ({
  requiresAuth,
  requiresRole = [Role.Coordinator, Role.Psychologist, Role.Patient],
}: usePagePermissionArgs): usePagePermissionReturn => {
  const router = useRouter();

  const pageStatus = useState("loading");

  const { client, data, error } = useMyUserQuery({
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (error) {
      // If MyUser returns error, clear token and apollo cache
      localStorage.removeItem("token");
      client.cache.reset();
      if (requiresAuth) {
        // If MyUser returns error and page requires auth, send to login page
        router
          .push("/login")
          .then(() => pageStatus.set("ready"))
          .catch((err) => console.error(err));
      } else {
        // If MyUser returns error but no auth is required, show page
        pageStatus.set("ready");
      }
    } else if (data) {
      if (!requiresRole.includes(data.myUser.role)) {
        // If MyUser returns user but with forbidden role, shows 404
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
