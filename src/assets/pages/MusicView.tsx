import { Container, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

const musicData = await fetch("/unearthed-archives/MusicData.json").then((r) =>
  r.json()
);

// TODO: THIS IS USED IN LIKE THREE FILES, TURN IT INTO A SHARED IMPORT
// Represents a music track's relevant information
type musicItem = {
  fileName: string;
  coverFileName: string;
  title: string;
  artist: string;
  description: string;
  tags: Array<string>;
};

const MusicView = () => {
  const { filename } = useParams();

  const itemInfo: musicItem = musicData["tracks"].find((item: musicItem) => {
    return item.fileName === filename;
  });

  // TODO: THIS IS ALSO USED IN Music.tsx TURN IT INTO A SHARED IMPORT
  const coverGenericCheck = (coverFileName: string) => {
    if (coverFileName) return coverFileName;
    else return "Generic_Album.webp";
  };

  // I put everything in a container just to make spacing a bit nicer ...I guess

  return (
    <Container
      style={{
        position: "absolute",
        top: "53%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Row>
        <Col>
          <Image
            rounded
            src={`music-covers/${coverGenericCheck(itemInfo.coverFileName)}`}
            className="mx-auto d-block"
            alt={"Music cover"}
            style={{ minWidth: "200px", width: "20%" }}
          />
          <p className="py-2" style={{ textAlign: "center" }}>
            <h5>
              <h4>
                <b>{itemInfo.title}</b>
              </h4>
              <i>{itemInfo.artist}</i>
            </h5>
            <small>Tags: {itemInfo.tags.join(", ")}</small>
          </p>
          <audio
            controls={true}
            preload="auto"
            src={`music-tracks/${filename}`}
            className="mx-auto d-block"
            style={{ width: "30%", minWidth: "300px" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MusicView;
