import React, { useEffect, useState } from "react";
import { Container, Col, Row, Accordion, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuctionApi } from "../AuctionApi";
import AuctionContainer from "../components/AuctionContainer";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export default function Home() {
  const { fetchAuctions } = useAuctionApi();
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuctions()
      .then((data) => {
        const filterData = data.slice(0, 3);
        setAuctions(filterData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch all auctions", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Container className="p-4 h-100">
        <Col>
          <Row className="text-center">
            <h1>Välkommen till Auktionen.se</h1>
            <h3>Där fynd ändrar livet!</h3>
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
          <h4 className="mt-5">Några av våra auktioner</h4>
          {/* visa senaste tio auktionerna */}
          <Row className="g-4">
            {loading ? (
              <LoadingSpinner />
            ) : (
              auctions.map((auction) => (
                <Col md={4} key={auction.AuctionID}>
                  <AuctionContainer
                    auction={auction}
                    button={"Visa"}
                    btnActive={true}
                    btnVariant="outline-success"
                  />
                </Col>
              ))
            )}
            <div className="mt-3 text-center mb-5">
              {" "}
              <br />
              <Button href="/auctions" size="lg" className="w-50 mx-auto">
                Visa alla auktioner
              </Button>
            </div>
          </Row>

          <div className="d-flex px-5 justify-content-center flex-column">
            {" "}
            <br />
            <h2 className="text-center d-block">
              Vad våra kunder tycker om oss?
            </h2>
            <Card className="mt-4 text-center">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <FaStar fill="orange " size={30} />
                  <FaStar fill="orange" size={30} />
                  <FaStar fill="orange" size={30} />
                  <FaStar fill="orange" size={30} />
                  <FaStarHalf fill="orange" size={30} />
                  <p className="mt-4">
                    "Jag älskar den spännande atmosfären och den stora
                    variationen av produkter som erbjuds på denna auktionsida.
                    Det är alltid roligt att bjuda och jag har haft tur med
                    många av mina köp. Dessutom är leveranstiderna snabba och
                    kundtjänsten är hjälpsam och tillmötesgående. Rekommenderas
                    starkt för alla som letar efter unika fynd!"
                  </p>
                  <div className="blockquote-footer">
                    <cite title="Reviewer Name">Björn Gustavsson</cite>
                  </div>
                </blockquote>
              </Card.Body>
            </Card>
            <Card className="mt-4 text-center">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <FaStar fill="orange " size={30} />
                  <FaStar fill="orange" size={30} />
                  <FaStar fill="orange" size={30} />
                  <FaRegStar size={30} color="gray" />
                  <FaRegStar size={30} color="gray" />
                  <p>
                    "Min erfarenhet av att handla på denna auktionsplats har
                    varit blandad. Å ena sidan finns det ett brett utbud av
                    produkter att välja mellan, vilket är bra. Men jag har märkt
                    att vissa föremål inte lever upp till förväntningarna när
                    det gäller kvalitet. Dessutom kan jag ibland uppleva att det
                    tar lite längre tid än förväntat att få mina köp levererade.
                    Det är fortfarande en acceptabel plats att handla på, men
                    det finns utrymme för förbättring."
                  </p>
                  <div className="blockquote-footer">
                    <cite title="Reviewer Name">Linda Karlsson</cite>
                  </div>
                </blockquote>
              </Card.Body>
            </Card>
            <Card className="mt-4 text-center">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <FaStar fill="orange " size={30} />
                  <FaStar fill="orange" size={30} />
                  <FaStar fill="orange" size={30} />
                  <FaStar fill="orange" size={30} />
                  <FaStar fill="orange" size={30} />
                  <p>
                    "Jag är extremt imponerad av den mångfald och kvalitet som
                    denna auktionsplats erbjuder. Från elektronik till
                    antikviteter, det finns något för alla. Dessutom är
                    användarupplevelsen smidig och intuitiv. Jag har vunnit
                    flera auktioner och varit nöjd med alla mina köp.
                    Toppbetyg!"
                  </p>
                  <div className="blockquote-footer">
                    <cite title="Reviewer Name">Andreas olofsson</cite>
                  </div>
                </blockquote>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
