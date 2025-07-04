import { Container, Row, Col } from "react-bootstrap";

const docData = await fetch("/unearthed-archives/DocData.json").then((r) =>
  r.json()
);

// Represents a document and its relevant information
type docItem = {
  title: string;
  description: string;
  url: string;
  category: string;
};

const Docs = () => {
  const logFunny = (funny: string) => {
    console.log(funny);
  };

  const categories = docData["categories"];
  const docCols: Array<Array<docItem>> = new Array();

  categories.forEach((category: string) =>
    docCols.push(docData["documents"][category])
  );

  // Note: I thought about using the key list of docsByCategory in place of categories[]
  // But I couldn't figure out how to get a key by its index

  const docsByCategory = docCols;

  // Generate a section of documents (category header, followed by info on each doc in that category)
  // Index corresponds to the index of a category in categories[] and docsByCategory[]
  const generateCategorySection = (index: number) => {
    return (
      <div className="mb-4">
        <h2>
          <b>
            <u>{categories[index]}</u>
          </b>
        </h2>
        {docsByCategory[index].map((docItem, itemIndex) => (
          <div
            className="mt-2 mb-3 pt-1 border border-primary rounded"
            key={itemIndex}
          >
            <a href={docItem.url}>
              <h5 className="mb-0 mx-2">
                <i>{docItem.title}</i>
              </h5>
            </a>
            <p className="mt-1 mb-2 mx-2">{docItem.description}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Container className="py-4">
        <Row>
          <Col>
            <h1>Unearthed Docs</h1>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col className="mx-3">
            {generateCategorySection(0)}
            {generateCategorySection(1)}
          </Col>
          <Col className="mx-3">
            {generateCategorySection(2)}
            {generateCategorySection(3)}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Docs;
