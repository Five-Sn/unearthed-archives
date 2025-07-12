import {
  Container,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";

// Properties
interface Props {
  // If the theme is light or dark, the dark mode button will render
  themeType: "light" | "dark" | "single";
  // The file name of the home icon
  homeIcon: string;
  themeSwitchFunction: () => void;
}

// Left part of the navbar
const mainNavSection = (icon: string) => {
  return (
    <>
      <Navbar.Brand href="#/">
        <img src={`theme/home/${icon}`} height="25" />
      </Navbar.Brand>
      <Nav.Link href="#/art">Art</Nav.Link>
      <Nav.Link href="#/music">Music</Nav.Link>
      <Nav.Link href="#/docs">Docs</Nav.Link>
    </>
  );
};

// Right part of the navbar
const nightModeButton = (
  themeType: "light" | "dark" | "single",
  themeSwitchFunction: () => void
) => {
  return (
    <>
      {themeType !== "single" && (
        <Button variant="outline-primary" onClick={themeSwitchFunction}>
          {themeType === "light" ? "🌙" : "☀️"}
        </Button>
      )}
    </>
  );
};

const NavBar = ({ themeType, homeIcon, themeSwitchFunction }: Props) => {
  return (
    <>
      <Container
        className="px-4 d-none d-sm-block"
        style={{
          width: "82%",
        }}
      >
        <Navbar>
          <Nav className="me-auto gap-3">{mainNavSection(homeIcon)}</Nav>
          <Nav className="ms-auto gap-2">
            {nightModeButton(themeType, themeSwitchFunction)}
            <Button variant="outline-primary" href="#/settings">
              Settings
            </Button>
          </Nav>
        </Navbar>
      </Container>

      <Container
        className="px-4 d-block d-sm-none"
        style={{
          width: "82%",
        }}
      >
        <Navbar>
          <Nav className="me-auto gap-1">{mainNavSection(homeIcon)}</Nav>
          <Nav className="ms-auto gap-1">
            {nightModeButton(themeType, themeSwitchFunction)}
            <Button variant="outline-primary" href="#/settings">
              🛠
            </Button>
          </Nav>
        </Navbar>
      </Container>
    </>
  );
};

export default NavBar;
