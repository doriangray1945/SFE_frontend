import { Route, Routes } from "react-router-dom";
import { AlbumPage } from "./pages/AlbumPage";
import ITunesPage from "./pages/ITunesPage";
import { ROUTES } from "../Routes";
import { HomePage } from "./components/HomePage";
import { BasicExample } from "./components/BasicExample";

function App() {
    return (
      <>
        <BasicExample /> {/* Добавляем навигационное меню */}
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ALBUMS} element={<ITunesPage />} />
          <Route path={`${ROUTES.ALBUMS}/:id`} element={<AlbumPage />} />
        </Routes>
      </>
    );
}

export default App;