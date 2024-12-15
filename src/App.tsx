import { Route, Routes } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar/NavigationBar"
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from "../Routes";
import { CityPage } from "./pages/CityPage/CityPage";
import CitiesPage from "./pages/CitiesSearchPage/CitiesSearchPage";
import { HomePage } from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage"
import VacancyApplicationPage from "./pages/VacancyApplicationPage/VacancyApplicationPage";


function App() {
    return (
      <BrowserRouter basename="/SFE_frontend">
        <NavigationBar />
        <Routes>
          <Route path={ROUTES.HOME} index element={<HomePage />} />
          <Route path={ROUTES.LOGIN} index element={<LoginPage />} />
          <Route path={ROUTES.CITIES} element={<CitiesPage />} />
          <Route path={`${ROUTES.CITIES}/:id`} element={<CityPage />} />
          <Route path={`${ROUTES.VACANCYAPPLICATION}/:id`} element={<VacancyApplicationPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;