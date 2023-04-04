
/** Binary health status. If all checks are healthy then status is "UP" */
export type HealthStatus = "UP" | "DOWN";

/** Describes the health of a system and any subsystems */
export interface HealthCheck {
  /** Name of the system */
  name?: string;
  /** If status is "UP", then the system is healthy and any subchecks have passed */
  status: HealthStatus;
};

/**
 * Describes the health of the overall system
 */
export type SystemHealth = {
  /** Checks indicating health of individual systems */
  checks: HealthCheck[];
} & HealthCheck;
