export const ROUTES = {
    HOME: "/",
    CITIES: "/cities",
    LOGIN: "/login",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    CITIES: "Города",
    LOGIN: "Авторизация",
  };