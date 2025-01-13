export const ROUTES = {
    HOME: "/",
    CITIES: "/cities",
    LOGIN: "/login",
    REGISTER: "/register",
    VACANCYAPPLICATION: "/vacancy_application",
    PROFILE: "/user",
    CITIESEDIT: "/cities/edit",
    CITIESCREATE: "/cities/create",
    FORBIDDEN: "/forbidden",
    NOTFOUND: "/notfound",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    CITIES: "Города",
    LOGIN: "Авторизация",
    REGISTER: "Регистрация",
    VACANCYAPPLICATION: "Заявки на создание вакансии",
    PROFILE: "Личный кабинет",
    CITIESEDIT: "Управление городами",
    CITIESCREATE: "Создание города",
    FORBIDDEN: "Доступ запрещен",
    NOTFOUND: "Не найдено",
  };