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
import UserApplicationsPage from "./pages/VacancyApplicationHistoryPage/VacancyApplicationHistoryPage"
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";


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
          <Route path={`${ROUTES.VACANCYAPPLICATION}`} element={<UserApplicationsPage />} />
          <Route path={`${ROUTES.PROFILE}`} element={< UserProfilePage/>} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;