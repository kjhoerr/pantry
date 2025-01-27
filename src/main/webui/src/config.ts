export const GRAPHQL_ENDPOINT =
  (import.meta.env.PUBLIC_HOST_ADDRESS) + "/graphql";
export const DEVMODE =
  import.meta.env.PUBLIC_ENV === "development" ||
  process.env.NODE_ENV === "development";
export const HEALTH_ENDPOINT =
  import.meta.env.PUBLIC_HOST_ADDRESS + "/q/health";
export const HEALTH_POLL = Number(import.meta.env.PUBLIC_HEALTH_POLL);
export const ENTRIES_PER_PAGE = Number(
  import.meta.env.PUBLIC_ENTRIES_PER_PAGE,
);
