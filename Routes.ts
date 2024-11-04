export const ROUTES = {
    HOME: "/",
    CITIES: "/cities",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    CITIES: "Города",
  };