import { Container, Row, Col } from "react-bootstrap";

const Changelog = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1>Updates</h1>
          <p>
            WELCOME TO THE CHANGELOG!!! AAHAAHAHAAHAHAA!!!!
            <br />I mostly write about new art tags here.
          </p>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <h2>◊ Mar 6, 2026</h2>
          <p>
            Added a third ball tune! <i>Dance with Death</i> by Wasp, which
            played during Erika's ball incident.
            <br />
            You can also access this changelog from the home page now.
            <br />
            You know what? I might as well add the Heart's Hollow fanfic to the
            document tab. ...Alright, there we go.
          </p>
          <br />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <h2>◊ Feb 24, 2026</h2>
          <p>
            Oh, I've got a hell of a change for you here. New addition:
            changelog.
            <br />
            <br />
            Also... new art tags for clothing:
            <i>
              <ul className="mb-1">
                <li>ball_outfit</li>
                <li>desert_outfit</li>
                <li>swimwear</li>
                <li>unique_outfit</li>
              </ul>
            </i>
            <i>Unique_outfit</i> is for art where a character is wearing
            something besides their usual fit that doesn't fall under the other
            three tags. It includes stuff like "von Faddey" Isaac and holloweeny
            Nikté art.
            <br />
            <br />
            And there are more tags I added a while ago that I think I'll bring
            attention to:
            <i>
              <ul className="mb-1">
                <li>masked_Raksha, unmasked_Raksha</li>
                <li>masked_Symon, unmasked_Symon</li>
                <li>1color, monochrome</li>
                <li>2colors</li>
                <li>3colors</li>
                <li>color</li>
              </ul>
            </i>
            <i>Color</i> applies to anything with more than one color. I want to
            add more tags for level of detail and finishedness in the future.
            <br />
            <br />
            Lastly, new music! I added Wasp's ball tunes under the <b>
              town
            </b>{" "}
            tab but something tells me they're too good for this website....
            <br />
            <small>The urge to turn this page into a blog is strong.</small>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Changelog;
