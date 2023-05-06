export const GRAPHQL_ENDPOINT =
  (process.env.REACT_APP_HOST_ADDRESS ?? "http://localhost:8080") + "/graphql";
export const DEVMODE = process.env.REACT_APP_ENV === "development";
export const HEALTH_ENDPOINT =
  (process.env.REACT_APP_HOST_ADDRESS ?? "http://localhost:8080") + "/q/health";
export const HEALTH_POLL = Number(process.env.REACT_APP_HEALTH_POLL ?? 10000);
export const ENTRIES_PER_PAGE = Number(process.env.REACT_APP_ENTRIES_PER_PAGE ?? "10");