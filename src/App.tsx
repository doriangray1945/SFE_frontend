import { Route, Routes } from "react-router-dom";
import { CityPage } from "./pages/CityPage/CityPage";
import CitiesPage from "./pages/CitiesSearchPage/CitiesSearchPage";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavigationBar } from "./components/NavigationBar/NavigationBar"
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from "react";

if (window && (window as any).__TAURI__) {

} else {
  console.error("Tauri API не доступен");
}

function App() {
  useEffect(() => {
    if ((window as any).__TAURI__) {
      const { invoke } = (window as any).__TAURI__.tauri;
      
      invoke('tauri', { cmd: 'create' })
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));

      return () => {
        invoke('tauri', { cmd: 'close' })
          .then((response: any) => console.log(response))
          .catch((error: any) => console.log(error));
      };
    } else {
      console.error("Tauri API не доступен");
    }
  }, []);


    return (
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path={ROUTES.HOME} index element={<HomePage />} />
          <Route path={ROUTES.CITIES} element={<CitiesPage />} />
          <Route path={`${ROUTES.CITIES}/:id`} element={<CityPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;