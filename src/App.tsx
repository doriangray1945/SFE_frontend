import { Route, Routes } from "react-router-dom";
import { CityPage } from "./pages/CityPage/CityPage";
import CitiesPage from "./pages/CitiesSearchPage/CitiesSearchPage";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavigationBar } from "./components/NavigationBar/NavigationBar"

function App() {
    return (
      <>
        <NavigationBar />
        <Routes>
          <Route path={ROUTES.HOME} index element={<HomePage />} />
          <Route path={ROUTES.CITIES} element={<CitiesPage />} />
          <Route path={`${ROUTES.CITIES}/:id`} element={<CityPage />} />
        </Routes>
      </>
    );
}

export default App;