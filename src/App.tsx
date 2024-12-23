import { Route, Routes } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar/NavigationBar"
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from "../Routes";
import { CityPage } from "./pages/CityPage/CityPage";
import CitiesPage from "./pages/CitiesSearchPage/CitiesSearchPage";
import { HomePage } from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import VacancyApplicationPage from "./pages/VacancyApplicationPage/VacancyApplicationPage";
import VacancyApplicationHistoryPage from "./pages/VacancyApplicationHistoryPage/VacancyApplicationHistoryPage"
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import CitiesEditPage from "./pages/CitiesEditPages/CitiesEditPages";
import CityEditPage from "./pages/CityEditPage/CityEditPage";
import ForbiddenPage from "./pages/403/403";
import NotFoundPage from "./pages/404/404";


function App() {
    return (
      <BrowserRouter basename="/SFE_frontend">
        <NavigationBar />
        <Routes>
          <Route path={ROUTES.HOME} index element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.CITIES} element={<CitiesPage />} />
          <Route path={`${ROUTES.CITIES}/:id`} element={<CityPage />} />
          <Route path={`${ROUTES.VACANCYAPPLICATION}/:app_id`} element={<VacancyApplicationPage />} />
          <Route path={`${ROUTES.VACANCYAPPLICATION}`} element={<VacancyApplicationHistoryPage />} />
          <Route path={`${ROUTES.PROFILE}`} element={< UserProfilePage/>} />
          <Route path={`${ROUTES.CITIESEDIT}`} element={<CitiesEditPage/>} />
          <Route path={`${ROUTES.CITIESEDIT}/:id`} element={<CityEditPage/>} />
          <Route path={`${ROUTES.FORBIDDEN}`} element={<ForbiddenPage/>} />
          <Route path={`${ROUTES.NOTFOUND}`} element={<NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;