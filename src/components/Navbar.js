import { NavLink } from "react-router-dom";
import './../styles/App.css'

const Navbar = () => {
  return (
    <nav id="navbar">
      <h1>Flags etCetera</h1>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            Shop
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
