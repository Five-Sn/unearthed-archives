import { Row, Col, Image } from "react-bootstrap";

// Represents a music track's relevant information
type musicItem = {
  fileName: string;
  coverFileName: string;
  title: string;
  artist: string;
  description: string;
  tags: Array<string>;
};

// Properties
interface Props {
  itemCols: Array<Array<musicItem>>;
}

const MusicDisplay = ({ itemCols }: Props) => {
  const coverPlaceholderCheck = (coverFileName: string) => {
    if (coverFileName) return coverFileName;
    else return "Placeholder Cover 160x160.png";
  };

  return (
    <>
      <Row>
        {itemCols.map((col, colIndex) => (
          <Col className="mx-3" key={colIndex}>
            {col.map((musicItem, itemIndex) => (
              <Row
                className="justify-content-md-centere py-2 px-2"
                key={itemIndex}
              >
                <Col className="mr-0 px-0" style={{ maxWidth: "132px" }}>
                  <Image
                    rounded
                    src={`music-covers/${coverPlaceholderCheck(
                      musicItem.coverFileName
                    )}`}
                    className="mx-auto d-block"
                    alt={"Music cover"}
                    style={{
                      width: "132px",
                      maxHeight: "132px",
                    }}
                  />
                </Col>
                <Col className="py-1 mx-2 border border-primary rounded">
                  <h5 className="mb-0">
                    <b>{musicItem.title}</b>
                  </h5>
                  <p className="mt-0 mb-1">
                    <i>{musicItem.artist}</i>
                    {` | `}
                    {musicItem.tags.join(", ")}
                  </p>
                  {false && <p className="my-1">{musicItem.tags.join(", ")}</p>}
                  <a
                    href={`#/music/view/${musicItem.fileName}`}
                    target="_blank"
                  >
                    <small>
                      (Full player)
                      <br />
                    </small>
                  </a>
                  <audio
                    controls={true}
                    preload="none"
                    src={`music-tracks/${musicItem.fileName}`}
                  />
                </Col>
              </Row>
            ))}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MusicDisplay;
