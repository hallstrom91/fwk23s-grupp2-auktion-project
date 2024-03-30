import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AuctionContainer from "../components/AuctionContainer";

export default function Home() {
  const [auctions, setAuctions] = useState([]);
  const [auctionBids, setAuctionBids] = useState({});

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("https://auctioneer.azurewebsites.net/auction/z2a");
        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error("Failed to fetch auctions", error);
      }
    };
    fetchAuctions();
  }, []);

  useEffect(() => {
    const fetchAuctionBids = async (auctionID) => {
      try {
        const response = await fetch(`https://auctioneer.azurewebsites.net/bid/${auctionID}`);
        const data = await response.json();
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
        <Row className="text-center mb-4">
          <h1>Auktioner</h1>
        </Row>
        <Row className="d-flex flex-wrap">
          {auctions.map((auction) => (
            <Col key={auction.AuctionID} lg={4} md={6} sm={12}>
              <AuctionContainer auction={auction} />
              {auctionBids[auction.AuctionID]?.map((bid) => (
                <div key={bid.BidID}>
                  <p>Högsta bud: {bid.Amount}</p>
                  <p>Budgivare: {bid.Bidder}</p>
                </div>
              ))}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
