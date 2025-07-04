import { Link } from "react-router-dom";
import { Container, Button, Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <Container>
        <ul className="nav justify-content-centere align-items-center">
          <li className="nav-item">
            <a href="/unearthed-archives#">
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
          <li className="nav-item">
            <Link className="nav-link" to="/docs">
              Docs
            </Link>
          </li>
          <li className="nav-item" style={{ display: "flex" }}>
            <Button
              style={{ marginLeft: "auto" }}
              onClick={(e) => console.log(e)}
            >
              Switch theme
            </Button>
          </li>
        </ul>
        <br />
      </Container>
    </>
  );
};

export default NavBar;
