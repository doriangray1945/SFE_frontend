import { Route, Routes } from "react-router-dom";
import { AlbumPage } from "./pages/AlbumPage";
import ITunesPage from "./pages/ITunesPage";
import { ROUTES } from "../Routes";

function App() {
    return (
        <Routes>
          <Route path={ROUTES.HOME} element={<h1>Посмореть музыку</h1>} />
          <Route path={ROUTES.ALBUMS} element={<ITunesPage />} />
          <Route path={`${ROUTES.ALBUMS}/:id`} element={<AlbumPage />} />
        </Routes>
      );
}

export default App;