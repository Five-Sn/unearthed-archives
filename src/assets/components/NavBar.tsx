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
      <Container>
        <Navbar>
          <Navbar.Brand href="unearthed-archives">
            <img
              src="ui/totally_final_unearthed_archives_logo.jpg"
              height="30"
            />
          </Navbar.Brand>
          <Nav className="me-auto gap-3">
            <Nav.Link href="unearthed-archives#/art">Art</Nav.Link>
            <Nav.Link href="unearthed-archives#/music">Music</Nav.Link>
            <Nav.Link href="unearthed-archives#/docs">Docs</Nav.Link>
          </Nav>
          {themeType !== "single" && (
            <Button variant="outline-primary" onClick={themeSwitchFunction}>
              {themeType === "light" ? "🌙" : "☀️"}
            </Button>
          )}
        </Navbar>
      </Container>
    </>
  );
};

export default NavBar;
