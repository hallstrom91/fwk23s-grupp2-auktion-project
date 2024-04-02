import React from "react";
import {
  Container,
  Col,
  Row,
  Accordion,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Container className="p-4 h-100">
        <Col>
          <Row className="text-center">
            <h1>Välkommen till Auktionen.se</h1>
            <h3>Där allt är tillåtet, och möjligt!</h3>
          </Row>
        </Col>
        <Row className="p-5">
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Sälj på Auktionen</Accordion.Header>
                <Accordion.Body>
                  <p>Här kan du testa sälja på auktion!</p>
                  <p>Inga regler, bara 10% i avgift.</p>
                  <p>Förskottsbetalning. Givetvis.</p>
                  <p>Välkommen.</p>
                  <div className="pt-4 d-flex justify-content-center">
                    <Button variant="outline-success" as={Link} to="/create">
                      Skapa Ny Auktion
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Letar du efter ett fynd?</Accordion.Header>
                <Accordion.Body>
                  <p>Här kan du hitta vadsomhelst.</p>
                  <p>Du kan fynda rejält.</p>
                  <p>Alltid på egen risk.</p>
                  <div className="pt-4 d-flex justify-content-center">
                    <Button variant="outline-success" as={Link} to="/auctions">
                      Titta på Auktioner
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          <Col className="d-flex justify-content-center">
            <ToastContainer>
              {/* Review #1 */}
              <Toast>
                <Toast.Header closeButton={false}>
                  <strong className="me-auto">Omdöme #1</strong>
                  <small className="text-muted">Anonym</small>
                </Toast.Header>
                <Toast.Body>
                  Bästa sidan, jag köpte min hund här. Den kom med posten inom 3
                  dagar. Rekommenderas!
                </Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
        </Row>
      </Container>
    </>
  );
}
