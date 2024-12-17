export const ROUTES = {
    HOME: "/",
    CITIES: "/cities",
    LOGIN: "/login",
    REGISTER: "/register",
    VACANCYAPPLICATION: "/vacancy_application",
    PROFILE: "/user"
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    CITIES: "Города",
    LOGIN: "Авторизация",
    REGISTER: "Регистрация",
    VACANCYAPPLICATION: "Заявка на создание вакансии",
    PROFILE: "Личный кабинет"
  };