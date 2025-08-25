import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Alert } from "flowbite-react";
import React from "react";

import { useHealth, useSelector } from "../hooks";

export const Health = () => {
  // Kick off health checks
  useHealth();

  const status = useSelector((state) => state.health.status);

  if (status === "DOWN") {
    return (
      <Alert
        icon={GlobeAltIcon}
        className="m-8 mb-0 bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
      >
        <b>Error: Pantry API is unreachable!</b>
        &nbsp;Check your network settings or contact your administrator.
      </Alert>
    );
  } else {
    return null;
  }
};
