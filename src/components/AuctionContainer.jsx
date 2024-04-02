import React, { useState, useEffect } from "react";
import { Card, Button, ButtonGroup, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

// import functions from AuctionAPI
import { useAuctionApi } from "../AuctionApi";

export default function AuctionContainer({
  auction,
  button,
  btnActive,
  btnVariant,
}) {
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

  const auctionTimeLeft = timeLeft[auction.AuctionID] || {};

  return (
    <>
      <Card className="custom-card">
        {/*  <Card.Img variant="top" src="holder.js/100px180" />  */}
        <Card.Body>
          <Card.Title className="text-center">{auction.Title}</Card.Title>
          <Card.Text>
            <strong>Slutdatum:</strong> {formatStaticDate(auction.EndDate)}
          </Card.Text>
          <Card.Text>
            <strong>Tid Kvar:</strong>{" "}
            {Object.keys(auctionTimeLeft).length
              ? `${auctionTimeLeft.days}d ${auctionTimeLeft.hours}h ${auctionTimeLeft.minutes}m ${auctionTimeLeft.seconds}s kvar`
              : "Auktionen Avslutad"}
          </Card.Text>
          <Card.Text>
            <strong>Utropspris:</strong> {auction.StartingPrice} kr
          </Card.Text>
          <ButtonGroup className="mt-1">
            <Link to={`/auctions/${auction.AuctionID}`}>
              <Button variant={btnVariant} disabled={!btnActive} size="sm">
                {button}
              </Button>
            </Link>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </>
  );
}
