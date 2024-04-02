import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
// components
import AuctionContainer from "../components/AuctionContainer";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchAuctions from "../components/SearchAuctions";
// import functions from AuctionAPI
import { useAuctionApi } from "../AuctionApi";

export default function Auctions() {
  const { fetchAuctions } = useAuctionApi();
  // state to display active or closed auctions
  const [auctions, setAuctions] = useState([]);
  const [filterAuctions, setFilterAuctions] = useState([]);
  const [closedAuctions, setClosedAuctions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // collect all auctions at mount
  useEffect(() => {
    fetchAuctions()
      .then((data) => {
        //update state
        setAuctions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch all auctions", error);
        setLoading(false);
        setError("Hämtning av auktioner misslyckades.");
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }, []);

  // function to filter active or closed auctions
  const filterActiveOrClosed = (auctions, closedAuctions) => {
    const currentDate = new Date();
    return auctions.filter((auction) =>
      closedAuctions
        ? new Date(auction.EndDate) <= currentDate
        : new Date(auction.EndDate) > currentDate
    );
  };

  // update filtered auctions when closed is changed
  useEffect(() => {
    if (auctions.length > 0) {
      setFilterAuctions(filterActiveOrClosed(auctions, closedAuctions));
    }
  }, [closedAuctions, auctions]);

  const toggleActiveorClosed = () => {
    setClosedAuctions((prevState) => !prevState);
  };

  return (
    <>
      <Container className="p-4">
        <Row className="m-2">
          <Col>
            <h1 className="text-center">
              {closedAuctions ? "Avslutade Auktioner" : "Auktioner"}
            </h1>
            <span>
              {error && <p className="text-center text-danger">{error}</p>}
            </span>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="d-flex justify-content-start">
            {/* <SearchAuctions onSearch={handleSearch} /> */}
            <SearchAuctions
              auctions={auctions}
              setFilterAuctions={setFilterAuctions}
            />
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-primary" onClick={toggleActiveorClosed}>
              {closedAuctions ? "Aktiva Auktioner" : "Avslutade Auktioner"}
            </Button>
          </Col>
        </Row>
        <Row className="g-4">
          {loading ? (
            <LoadingSpinner />
          ) : (
            filterAuctions.map((auction) => (
              <Col md={4} key={auction.AuctionID}>
                <AuctionContainer
                  auction={auction}
                  button={closedAuctions ? "SÅLD" : "Visa"}
                  btnActive={!closedAuctions}
                  btnVariant={
                    closedAuctions ? "outline-dark" : "outline-success"
                  }
                />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
}
