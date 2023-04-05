import { useInterval } from "@mantine/hooks";
import { useEffect } from "react";

import { SystemHealth } from "../model";
import { useDispatch } from "../store";
import { healthUpdate } from "../store/reducers/health";

const health =
  (process.env.REACT_APP_HOST_ADDRESS ?? "http://localhost:8080") + "/q/health";
const pollingRate = Number(process.env.REACT_APP_HEALTH_POLL ?? 10000);

/**
 * Query server's health API endpoint
 */
const performHealthcheck = (): Promise<SystemHealth | undefined> => {
  return fetch(health)
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
    pollingRate,
  );

  useEffect(() => {
    interval.start();

    return interval.stop;
  }, [interval]);
};
