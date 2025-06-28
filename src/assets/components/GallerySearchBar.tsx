import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

// This search bar fits into a Container

// Properties
interface Props {
  placeholderText: string;
  onClick: (seachString: string) => void;
  children?: React.ReactNode;
}

const GallerySearchBar = ({ placeholderText, onClick, children }: Props) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <Form>
        <Row className="py-4">
          <Col xs={11}>
            <Form.Control
              type="text"
              placeholder={placeholderText}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {children}
          </Col>
          <Col xs={1}>
            <Button type="submit" onClick={(e) => onClick(searchInput)}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default GallerySearchBar;
