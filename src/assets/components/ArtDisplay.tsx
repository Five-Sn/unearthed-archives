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
  itemRows: Array<Array<imageItem>>;
  itemsPerRow: number;
}

const ArtDisplay = ({ itemRows, itemsPerRow }: Props) => {
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
    <>
      {itemRows.map((row, rowIndex) => (
        <Row
          md={itemsPerRow}
          className="align-items-center py-3"
          key={rowIndex}
        >
          {row.map((imageItem, colIndex) => (
            <Col className="mx-auto" key={colIndex} style={{ width: "185px" }}>
              <a href={`#/art/view/${imageItem.fileName}`} target="_blank">
                <img
                  src={`art-thumbnails/${jpgName(imageItem.fileName)}`}
                  className="img-fluid thumbnail mx-auto d-block border"
                  alt={imageItem.alt}
                  style={{ maxWidth: "140px", maxHeight: "150px" }}
                />
              </a>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

export default ArtDisplay;
