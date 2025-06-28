import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <ul className="nav justify-content-center align-items-center">
        <li className="nav-item">
          <a href="/">
            <img
              src="ui/totally_final_unearthed_archives_logo.jpg"
              height="30"
              className="d-inline-block align-bottom"
            />
          </a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/art">
            Art
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/music">
            Music
          </Link>
        </li>
      </ul>
      <br />
    </>
  );
};

export default NavBar;
