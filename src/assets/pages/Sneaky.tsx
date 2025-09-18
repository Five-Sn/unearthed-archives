import { Container, Row, Col } from "react-bootstrap";

const Sneaky = () => {
  const audio = new Audio("music-tracks/Sneaky Snitch.mp3");
  audio.loop = true;
  audio.play();

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1>You sneaky sneakster!</h1>
        </Col>
      </Row>
      <Row className="py-4">
        <Col>
          <h5>You think you're slick, huh?</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default Sneaky;
