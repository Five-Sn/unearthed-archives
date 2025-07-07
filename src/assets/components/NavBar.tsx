import { Container, Button, Navbar, Nav } from "react-bootstrap";

// Properties
interface Props {
  // If the theme is light or dark, the dark mode button will render
  themeType: "light" | "dark" | "single";
  themeSwitchFunction: () => void;
}

const NavBar = ({ themeType, themeSwitchFunction }: Props) => {
  return (
    <>
      <Container
        style={{
          width: "80%",
        }}
      >
        <Navbar>
          <Navbar.Brand href="#/">
            <img
              src="ui/totally_final_unearthed_archives_logo.jpg"
              height="30"
            />
          </Navbar.Brand>
          <Nav className="me-auto gap-3">
            <Nav.Link href="#/art">Art</Nav.Link>
            <Nav.Link href="#/music">Music</Nav.Link>
            <Nav.Link href="#/docs">Docs</Nav.Link>
            <Nav.Link href="#/toodoo">Todo</Nav.Link>
          </Nav>
          <Nav className="ms-auto gap-2">
            {themeType !== "single" && (
              <Button variant="outline-primary" onClick={themeSwitchFunction}>
                {themeType === "light" ? "🌙" : "☀️"}
              </Button>
            )}
            <Button variant="outline-primary" href="#/themes">
              Themes
            </Button>
          </Nav>
        </Navbar>
      </Container>
    </>
  );
};

export default NavBar;
