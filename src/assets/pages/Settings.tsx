import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
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
  | "nikte"
  | "desert-light"
  | "desert-dark";

const Settings = () => {
  // Whenever this useLocalStorage theme is updated, the useEffect in Layout.tsx will detect it
  // Then it'll apply the theme to the HTML body properly
  const [theme, setTheme] = useLocalStorage<themeString>("theme", "um-light");

  // How many artworks to display per pagination page on the Art page
  const [artPerPage, setArtPerPage] = useLocalStorage("art-per-page", 36);
  // Used for the input form
  const [artPageInput, setArtPageInput] = useState<string>("");
  // Used for the "Save" button next to the input form
  const [artPageSubmitVisibility, setArtPageSubmitVisibility] = useState(false);

  const updateArtPerPage = (newAmountInput: string) => {
    const numInput = Number(newAmountInput);
    if (numInput > 0) {
      setArtPerPage(Number(artPageInput));
      setArtPageSubmitVisibility(false);
    } else {
      console.log(
        "Invalid input for artworks per page- refusing to update value"
      );
    }
  };

  const getThemeSample = (themeName: themeString, spacing: boolean = true) => {
    return (
      <Col xs="auto" className={`${spacing && "pt-3"}`}>
        <div onClick={(e) => setTheme(themeName)} style={{ cursor: "pointer" }}>
          <ThemeSample
            displayName={themeData[themeName].displayName}
            thumbnailFile={themeData[themeName].thumbnailImage}
          />
        </div>
      </Col>
    );
  };

  const getThemePair = (lightName: themeString, darkName: themeString) => {
    return (
      <Col xs="auto" className="mx-2 p-3 border rounded">
        <Row>
          {getThemeSample(lightName, false)}
          {getThemeSample(darkName, false)}
        </Row>
      </Col>
    );
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1>Settings</h1>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <h2>Art Display</h2>
        </Col>
      </Row>
      <Form className="row mb-3">
        <Form.Label>Artworks per page:</Form.Label>
        <Col xs="auto">
          <Form.Control
            type="number"
            defaultValue={artPerPage}
            title="Multilpes of 6 recommended"
            onChange={(e) => {
              setArtPageInput(e.currentTarget.value);
              setArtPageSubmitVisibility(true);
            }}
            style={{ maxWidth: "80px" }}
          />
        </Col>
        <Col xs="auto" className="px-0">
          {artPageSubmitVisibility && (
            <Button
              type="submit"
              onClick={(e) => {
                updateArtPerPage(artPageInput);
              }}
            >
              Save
            </Button>
          )}
        </Col>
      </Form>
      <br />
      <Row>
        <Col>
          <h2>Theme</h2>
          <p className="mb-0">Change the color scheme of the website here</p>
          <small className="mt-0">
            Wanna make your own theme? Just let me know!
          </small>
          <br className="mb-4" />
          <h4>
            <b>
              <u>Defaults</u>
            </b>
          </h4>
        </Col>
      </Row>
      <Row>
        {getThemePair("um-light", "um-dark")}
        {getThemePair("light", "dark")}
      </Row>
      <br />
      <Row>
        <Col>
          <h4>
            <b>
              <u>Others</u>
            </b>
          </h4>
        </Col>
      </Row>
      <Row>
        {getThemePair("desert-light", "desert-dark")}
        {getThemeSample("azure")}
        {getThemeSample("nikte")}
      </Row>
      {false && (
        <>
          <br />
          <Row>
            <Col>
              <h4>
                <b>
                  <u>Work in progress</u>
                </b>
              </h4>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Settings;
