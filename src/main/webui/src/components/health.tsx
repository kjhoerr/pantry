import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Alert } from "flowbite-react";

import { useHealth, useSelector } from "../hooks";

export const Health = () => {
  // Kick off health checks
  useHealth();

  const health = useSelector((state) => state.health);
  const isOnline = health.status === "UP";

  if (!isOnline) {
    return (
      <Alert
        icon={GlobeAltIcon}
        className="m-8 mb-0 bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
      >
        <b>Error: Pantry API is unreachable!</b>
        &nbsp;
        Check your network settings or contact your administrator.
      </Alert>
    );
  } else {
    return null;
  }
};
