import { Route, Routes } from "react-router-dom";
import { CityPage } from "./pages/AlbumPage";
import ITunesPage from "./pages/ITunesPage";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage";
import { BasicExample } from "./components/BasicExample";

function App() {
    return (
      <>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CITIES} element={<ITunesPage />} />
          <Route path={`${ROUTES.CITIES}/:id`} element={<CityPage />} />
        </Routes>
      </>
    );
}

export default App;