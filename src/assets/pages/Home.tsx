import { Container, Row, Col, Button } from "react-bootstrap";

// TODO: Use a list and mapping to de-hardcode the buttons below

const spacingPerElement = "py-1 mb-3";

const Home = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "82vh",
      }}
    >
      <Row className="justify-content-md-center">
        <Col>
          <img
            src="ui/totally_final_unearthed_archives_logo.jpg"
            className={spacingPerElement}
          />
          <br />
          <br />
          <h5 className="mb-3" style={{ textAlign: "center" }}>
            Check out an archive!
          </h5>
          <Button
            variant="outline-primary"
            href="#/art"
            className={`mx-auto ${spacingPerElement}`}
            style={{ display: "flex", width: "75%", justifyContent: "center" }}
          >
            Art
          </Button>
          <Button
            variant="outline-primary"
            href="#/music"
            className={`mx-auto ${spacingPerElement}`}
            style={{ display: "flex", width: "75%", justifyContent: "center" }}
          >
            Music
          </Button>
          <Button
            variant="outline-primary"
            href="#/docs"
            className={`mx-auto ${spacingPerElement}`}
            style={{ display: "flex", width: "75%", justifyContent: "center" }}
          >
            Documents
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
