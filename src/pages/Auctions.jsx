import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Home() {
  return (
    <>
      <Container className="p-4">
        <Col>
          <Row className="text-center">
            <h1>Auktioner</h1>
          </Row>
        </Col>
      </Container>
    </>
  );
}
