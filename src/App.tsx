import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { CardsPage } from "./pages/CardsPage";
import { AddPage } from "./pages/AddPage";
import { PlayPage } from "./pages/PlayPage";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route
          path="/cards"
          element={<CardsPage />}
        />

        <Route
          path="/add"
          element={<AddPage />}
        />

        <Route
          path="/play"
          element={<PlayPage />}
        />

        <Route
          path="/"
          element={
            <Navigate
              to="/cards"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/cards"
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}