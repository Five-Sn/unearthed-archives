import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

// This search bar fits into a Container
// It has a... search bar and a "Submit" button
// Any children will be displayed directly under the bar

// Properties
interface Props {
  placeholderText: string;
  inputText: string;
  onClick: (seachString: string) => void;
  children?: React.ReactNode;
}

const GallerySearchBar = ({
  placeholderText,
  inputText = "",
  onClick,
  children,
}: Props) => {
  const [searchInput, setSearchInput] = useState(inputText);

  return (
    <Form>
      <Row className="py-4">
        <Col className="mr-0 pr-0">
          <Form.Control
            type="text"
            placeholder={placeholderText}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {children}
        </Col>
        <Col xs="auto" className="ml-0 pl-0">
          <Button type="submit" onClick={(e) => onClick(searchInput)}>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default GallerySearchBar;
