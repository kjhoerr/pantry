import { useInterval } from "@mantine/hooks";
import { useEffect } from "react";

import { HEALTH_ENDPOINT, HEALTH_POLL } from "../config";
import { SystemHealth } from "../model";
import { useDispatch } from "../store";
import { healthUpdate } from "../store/reducers/health";

/**
 * Query server's health API endpoint
 */
const performHealthcheck = (): Promise<SystemHealth | undefined> => {
  return fetch(HEALTH_ENDPOINT)
    .then((res) => (res.ok ? res.json() : undefined))
    .then((body) =>
      body?.status !== undefined ? (body as SystemHealth) : undefined,
    )
    .catch(() => undefined);
};

/**
 * Update the health reducer by querying server's health API.
 *
 * Uses a configured poll rate (default 10 seconds).
 */
export const useHealth = () => {
  const dispatch = useDispatch();

  const interval = useInterval(
    () =>
      performHealthcheck().then((result) => {
        dispatch(healthUpdate(result));
      }),
    HEALTH_POLL,
  );

  useEffect(() => {
    interval.start();

    return interval.stop;
  }, [interval]);
};
