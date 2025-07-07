import { Container, Row, Col } from "react-bootstrap";
import useLocalStorage from "use-local-storage";
import ThemeSample from "../components/ThemeSample";

const themeData = await fetch("/unearthed-archives/ThemeData.json").then((r) =>
  r.json()
);

type themeString =
  | "light"
  | "dark"
  | "um-light"
  | "um-dark"
  | "azure"
  | "nikte";

const Themes = () => {
  // Whenever this useLocalStorage theme is updated, the useEffect in Layout.tsx will detect it
  // Then it'll apply the theme to the HTML body properly
  const [theme, setTheme] = useLocalStorage<themeString>("theme", "um-dark");

  const getThemeSample = (themeName: themeString) => {
    return (
      <Col xs="auto">
        <div onClick={(e) => setTheme(themeName)} style={{ cursor: "pointer" }}>
          <ThemeSample
            displayName={themeData[themeName].displayName}
            thumbnailFile={themeData[themeName].thumbnailFile}
          />
        </div>
      </Col>
    );
  };

  const getThemePair = (lightName: themeString, darkName: themeString) => {
    return (
      <Col xs="auto" className="mx-2 p-3 border rounded">
        <Row>
          {getThemeSample(lightName)}
          {getThemeSample(darkName)}
        </Row>
      </Col>
    );
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1>Theme Settings</h1>
          <p>Change the color scheme of the website here</p>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <h2>
            <b>
              <u>Defaults</u>
            </b>
          </h2>
        </Col>
      </Row>
      <Row>
        {getThemePair("um-light", "um-dark")}
        {getThemePair("light", "dark")}
      </Row>
      <br />
      <Row>
        <Col>
          <h2>
            <b>
              <u>Others</u>
            </b>
          </h2>
          <p>Coming soon</p>
        </Col>
      </Row>
      <Row>
        {false && getThemeSample("azure")}
        {false && getThemeSample("nikte")}
      </Row>
    </Container>
  );
};

export default Themes;
