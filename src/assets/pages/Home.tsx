import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import useLocalStorage from "use-local-storage";

// TODO: Use a list and mapping to de-hardcode the buttons below

const themeData = await fetch("/unearthed-archives/ThemeData.json").then((r) =>
  r.json()
);

type themeString =
  | "light"
  | "dark"
  | "um-light"
  | "um-dark"
  | "azure"
  | "nikte"
  | "desert-light"
  | "desert-dark";

// Represents a theme and its information
type themeItem = {
  name: string;
  displayName: string;
  logoImage: string;
  homeNavImage: string;
  backgroundImage?: string;
  type: "light" | "dark" | "single";
  partnerTheme: themeString;
  thumbnailFile: string;
};

const spacingPerElement = "py-1 mb-2";

const Home = () => {
  // Whenever this useLocalStorage theme is updated, the useEffect in Layout.tsx will detect it
  // Then it'll apply the theme to the HTML body properly
  const [theme, setTheme] = useLocalStorage<themeString>("theme", "um-light");
  const [themeType, setThemeType] = useState<"light" | "dark" | "single">(
    "single"
  );

  // Detects when theme is changed
  // Updates the HTML tag (the visual appearance) and the curThemeInfo object
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
    setThemeType(themeData[theme].type);
  }, [theme]);

  const toggleDarkTheme = () => {
    setTheme(themeData[theme].partnerTheme);
  };

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${themeData[theme].backgroundImage || ""})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        className="bg-body"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "82vw",
          height: "100vh",
        }}
      >
        <Row className="justify-content-md-center">
          <Col>
            <br />
            <img
              src={`theme/logos/${themeData[theme].logoImage}`}
              className={spacingPerElement}
              style={{ maxHeight: "150px", maxWidth: "100%" }}
            />
            <br />
            <h5 className="mt-4 mb-2" style={{ textAlign: "center" }}>
              Check out an archive!
            </h5>
            <Button
              variant="outline-primary"
              href="#/art"
              className={`mx-auto ${spacingPerElement}`}
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "center",
              }}
            >
              Art
            </Button>
            <Button
              variant="outline-primary"
              href="#/music"
              className={`mx-auto ${spacingPerElement}`}
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "center",
              }}
            >
              Music
            </Button>
            <Button
              variant="outline-primary"
              href="#/docs"
              className={`mx-auto ${spacingPerElement}`}
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "center",
              }}
            >
              Documents
            </Button>
            <p className="mt-3 mb-0" style={{ textAlign: "center" }}>
              Or change visuals:
            </p>
            <Button
              variant="outline-primary"
              href="#/settings"
              className={`mx-auto d-block ${spacingPerElement}`}
              style={{ width: "25%" }}
            >
              <small>Settings</small>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
