import {
  useDocumentVisibility,
  useInterval,
  useShallowEffect,
} from "@mantine/hooks";

import { HEALTH_ENDPOINT, HEALTH_POLL } from "../config";
import { SystemHealth } from "../model";
import { useDispatch } from "../store";
import { healthUpdate } from "../store/reducers/health";

/**
 * Query server's health API endpoint
 */
const performHealthcheck = async (): Promise<SystemHealth | undefined> => {
  try {
    const response = await fetch(HEALTH_ENDPOINT, {
      signal: AbortSignal.timeout(HEALTH_POLL),
    });

    if (response.ok) {
      const body = await response.json();

      if (body["status"] !== undefined) {
        return body;
      }
    }
  } catch {
    /* do nothing */
  }

  return undefined;
};

/**
 * Update the health reducer by querying server's health API.
 *
 * Uses a configured poll rate (default 10 seconds).
 */
export const useHealth = () => {
  const dispatch = useDispatch();
  const check = () =>
    performHealthcheck().then((result) => dispatch(healthUpdate(result)));
  const visibility = useDocumentVisibility();

  const interval = useInterval(check, HEALTH_POLL);
  useShallowEffect(() => {
    interval.start();

    return interval.stop;
  }, []);

  useShallowEffect(() => {
    check();
  }, []);

  useShallowEffect(() => {
    if (visibility === "visible") {
      interval.start();
    } else {
      interval.stop();
    }
  }, [visibility]);
};
