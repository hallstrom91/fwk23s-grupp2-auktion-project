import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  ButtonGroup,
  ListGroup,
  Col,
  Row,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

// import functions from AuctionAPI
import { useAuctionApi } from "../AuctionApi";

export default function ViewAuctionInfo({ auction, leadingBid }) {
  const { calculateTimeLeft, formatStaticDate } = useAuctionApi();

  //state for timeCalc
  const [timeLeft, setTimeLeft] = useState({});

  // use functions to calc time left
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = {
        ...timeLeft,
        [auction.AuctionID]: calculateTimeLeft(auction.EndDate),
      };
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [auction.AuctionID, auction.EndDate]);
  // for use in page
  const auctionTimeLeft = timeLeft[auction.AuctionID] || {};

  return (
    <>
      <Card className="custom-card">
        {/* Card-Header for createdBy & countdown */}
        <Card.Header>
          <Row>
            <Col xs={6}>
              {/* Display CreatedBy top-left */}
              <Card.Text className="text-start">
                <strong>Säljare:</strong> {auction.CreatedBy}
              </Card.Text>
            </Col>
            <Col xs={6}>
              <Card.Text className="text-end">
                <strong>Tid Kvar: </strong>
                {Object.keys(auctionTimeLeft).length
                  ? `${auctionTimeLeft.days}d ${auctionTimeLeft.hours}t ${auctionTimeLeft.minutes}m ${auctionTimeLeft.seconds}s`
                  : "Auktionen Avslutad"}
              </Card.Text>
            </Col>
          </Row>
        </Card.Header>
        {/* Card-Body For StartDate, EndDate in static form */}
        <Card.Body>
          <Row>
            <Col xs={6}>
              {/* Display StartDate top-left */}
              <Card.Text className="text-start">
                <strong>Startdatum:</strong>{" "}
                {formatStaticDate(auction.StartDate)}
              </Card.Text>
            </Col>
            {/* Display EndDate top-right */}
            <Col xs={6}>
              <Card.Text className="text-end">
                <strong>Slutdatum:</strong> {formatStaticDate(auction.EndDate)}
              </Card.Text>
            </Col>
          </Row>

          <Row className="mt-5">
            {/* Display Description of auction*/}
            <Col className="mt-5">
              <Card.Text className="text-start" as="h5">
                <strong>Beskrivning:</strong>
              </Card.Text>
              <Card.Text>{auction.Description}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row>
            {/* Display StartingPrice of auction */}
            <Col xs={6}>
              <Card.Text className="text-start">
                <strong>Utropspris:</strong> {auction.StartingPrice} kr
              </Card.Text>
            </Col>
            {/* Display leading / highest bid */}
            <Col xs={6}>
              {leadingBid ? (
                <Card.Text className="text-end">
                  <strong>Högsta Bud: </strong>
                  {leadingBid.Amount} kr av {leadingBid.Bidder}
                </Card.Text>
              ) : (
                <Card.Text className="text-end">
                  <strong>Avslutad utan bud...</strong>
                </Card.Text>
              )}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
}
