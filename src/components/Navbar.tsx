import { NavLink } from "react-router-dom";
import logo3link from "../assets/logo3link.png";

export function Navbar() {
  return (
    <header className="topbar">
      <NavLink className="brand" to="/cards">
        <img
          src={logo3link}
          alt="3Link"
          className="brand-logo"
        />
      </NavLink>

      <nav className="navigation">
        <NavLink
          to="/cards"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Cards
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Add
        </NavLink>

        <NavLink
          to="/play"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Play
        </NavLink>
      </nav>
    </header>
  );
}