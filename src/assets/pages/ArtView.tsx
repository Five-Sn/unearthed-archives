import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

const artData = await fetch("/unearthed-archives/ArtData.json").then((r) =>
  r.json()
);

// TODO: MAKE THIS A SEPARATE THING AND IMPORT IT
// Represents an image and its relevant information
type artItem = {
  fileName: string;
  alt: string;
  artist: Array<string>;
  shareDate: number;
  tags: Array<string>;
};

const ArtView = () => {
  const { filename } = useParams();

  const itemInfo: artItem = artData["works"].find((item: artItem) => {
    return item.fileName === filename;
  });

  const generateDisplayList = (label: string, elements: Array<string>) => {
    const fullLabel = label + (elements.length === 1 ? "" : "s") + ": ";

    return (
      <>
        <h5 className="my-0">
          <b>{fullLabel}</b>
        </h5>
        {elements.map((element, elementId) => (
          <p className="my-0" key={elementId}>
            {element}
          </p>
        ))}
      </>
    );
  };

  const monthMap = new Map([
    ["01", "January"],
    ["02", "February"],
    ["03", "March"],
    ["04", "April"],
    ["05", "May"],
    ["06", "June"],
    ["07", "July"],
    ["08", "August"],
    ["09", "September"],
    ["10", "October"],
    ["11", "November"],
    ["12", "December"],
  ]);

  const generateShareDateString = (rawDate: number) => {
    const dateString = rawDate.toString();
    // Separated into 0: year, 1: month, 2: day
    const datePieces = [
      dateString.substring(0, 4),
      dateString.substring(4, 6),
      dateString.substring(6, 8),
    ];
    return (
      "Shared " +
      monthMap.get(datePieces[1]) +
      " " +
      datePieces[2] +
      ", " +
      datePieces[0]
    );
  };

  // NOTE: The <img> below has a src="art-works/..."
  // This allows users on the github cite to right click -> open in new tab
  // Though it doesn't work locally

  return (
    <>
      <br />
      <Container className="py-2">
        <Row>
          <Col xs={8}>
            <img
              src={`art-works/${itemInfo.fileName}`}
              className="border"
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={3}>
            {generateDisplayList("Artist", itemInfo.artist)}
            <br />
            {generateDisplayList("Tag", itemInfo.tags)}
            <br />
            <p>{itemInfo.fileName}</p>
            <p>{generateShareDateString(itemInfo.shareDate)}</p>
          </Col>
        </Row>
      </Container>
      <br />
    </>
  );
};

export default ArtView;
