import { Row, Col } from "react-bootstrap";

// Represents an image and its relevant information
type imageItem = {
  fileName: string;
  alt: string;
  artist: Array<string>;
  shareDate: number;
  tags: Array<string>;
};

// Properties
interface Props {
  itemPage: Array<imageItem>;
}

// TODO: ?Maybe change the Cols below so they have a set width, similar to the old ArtDisplay
// Test out the current one on different platforms and screen sizes to see if they need width
// to keep from overlapping

const ArtDisplay = ({ itemPage }: Props) => {
  // Takes the file name of an image and replaces its extension with "jpg"
  // Used to retrieve the jpeg thumnails for most images
  const jpgName = (file: string) => {
    let fileParts = file.split(".");
    // If the file is a gif, return it as-is
    if (fileParts[1] === "gif") {
      return file;
    } else {
      return `${fileParts[0]}.jpg`;
    }
  };

  return (
    <Row className="align-items-center">
      {itemPage.map((item, itemIndex) => (
        <Col
          className="mx-auto py-3"
          key={itemIndex}
          xs={6}
          md={4}
          lg={2}
          style={{
            minWidth: "150px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a href={`#/art/view/${item.fileName}`}>
            <img
              src={`art-thumbnails/${jpgName(item.fileName)}`}
              className="img-fluid thumbnail mx-auto d-block border"
              alt={item.alt}
              style={{ maxWidth: "138px", maxHeight: "150px" }}
            />
          </a>
        </Col>
      ))}
    </Row>
  );
};

export default ArtDisplay;
