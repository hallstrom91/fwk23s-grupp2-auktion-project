import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Home() {
  // getter & setter for auction-objects
  const [auctions, setAuctions] = useState([]);

  // getter & setter for auction-objects connected bids
  const [auctionBids, setAuctionBids] = useState([]);

  // Fetch Call to get all auctions, mounts at render
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch(
          "https://auctioneer.azurewebsites.net/auction/z2a"
        );
        const data = await response.json();
        console.log(data);
        setAuctions(data);
      } catch (error) {
        console.error("Failed to fetch auctions", error);
      }
    };
    fetchAuctions();
  }, []);

  // Fetch call to get bids connected to a specific auction object
  useEffect(() => {
    const fetchAuctionBids = async () => {
      try {
        const response = await fetch(
          "https://auctioneer.azurewebsites.net/bid/}"
        );
        const data = await response.json();
        console.log(data);
        setAuctionBids((prevBids) => ({ ...prevBids, [auctionID]: data }));
      } catch (error) {
        console.error("Failed to fetch bid to auction object", error);
      }
    };

    auctions.forEach((auction) => {
      fetchAuctionBids(auction.AuctionID);
    });
  }, [auctions]);

  return (
    <>
      <Container className="p-4">
        <Col>
          <Row className="text-center">
            {/* Import of auction objects */}
            <h1>Auktioner</h1>
          </Row>
        </Col>
        <Row>
          <Col>
            {/* Display Auction Object  */}
            {auctions.map((auction) => (
              <div key={auction.AuctionID} className="pb-5">
                <p>Title: {auction.Title}</p>
                <p>Beskrivning: {auction.Description}</p>
                <p>Startdatum: {auction.StartDate}</p>
                <p>Slutdatum: {auction.EndDate}</p>
                <p>Startbud: {auction.StartingPrice}</p>
                <p>Säljare: {auction.CreatedBy}</p>
                {/* Display Bids connected to a specific Auction Object  */}
                {auctionBids[auction.AuctionID] &&
                  auctionBids[auction.AuctionID].map((bid) => (
                    <div key={bid.BidID}>
                      <p>Högsta bud: {bid.Amount}</p>
                      <p>Budgivare: {bid.Bidder}</p>
                    </div>
                  ))}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
