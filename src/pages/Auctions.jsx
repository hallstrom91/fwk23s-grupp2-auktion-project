import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import DeleteAuctionBtn from "../components/DeleteAuctionBtn";
import AddAuction from "../components/AddAuction";
import { useAuctionApi } from "../AuctionApi";

export default function Auctions() {
  const { auctions, fetchAuctions, createAuction } = useAuctionApi();

  useEffect(() => {
    fetchAuctions();
  }, []);

  const handleDelete = () => {
    fetchAuctions();
  };

  return (
    <>
      <Container className="p-4">
        <Col>
          <Row className="text-center">
           
            <h1>Auktioner</h1>
          </Row>
        </Col>
        <Row>
          
          <div className="flex">
            {auctions.map((auction) => (
              <div key={auction.AuctionID} className="m-2 border border-dark">
                <h5 className="text-center">Title: {auction.Title}</h5>
                <p>Beskrivning: {auction.Description}</p>
                <p>Startdatum: {auction.StartDate}</p>
                <p>Slutdatum: {auction.EndDate}</p>
                <p>Startbud: {auction.StartingPrice}</p>
                <p>Säljare: {auction.CreatedBy}</p>
                <div className="m-2 border border-black ">
                  {auction.bids.map((bid) => (
                    <ul key={bid.AuctionID}>
                      <li>
                        <p>Budgivare: {bid.Bidder} </p>
                        <p>Högsta Bud: {bid.Amount}</p>
                      </li>
                    </ul>
                  ))}
                </div>
                <div className="">
                  <DeleteAuctionBtn auction={auction} onDelete={handleDelete} />
                </div>
              </div>
            ))}
          </div>
        </Row>
        <Row>
          <Col className="mt-4 d-flex flex-column">
            <AddAuction onCreateAuction={createAuction} />
          </Col>
        </Row>
      </Container>
    </>
  );
}