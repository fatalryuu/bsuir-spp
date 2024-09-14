export enum APP_ROUTES {
  NOT_FOUND = "*",
  BASE = "/",
  USERS = "/users",
}

export interface Route {
  path: APP_ROUTES;
  element: React.ReactNode;
}
