import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import DeleteAuctionBtn from "../components/DeleteAuctionBtn";

// import functions from AuctionAPI
import { useAuctionApi } from "../AuctionApi";

export default function Auctions() {
  // import functions from AuctionApi.jsx to use here
  const { auctions, fetchAuctions, createAuction } = useAuctionApi();

  // collect auction-objects and connected bids to display at mount
  useEffect(() => {
    fetchAuctions();
  }, []);

  // collect and send userData to create new auction item.
  const [newAuction, setNewAuction] = useState({
    Title: "",
    Description: "",
    EndDate: "",
    StartingPrice: "",
    CreatedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAuction((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAuction(newAuction);
    // reset input-values after submit
    setNewAuction({
      Title: "",
      Description: "",
      EndDate: "",
      StartingPrice: "",
      CreatedBy: "",
    });
  };

  // handle delete of object
  const handleDelete = () => {
    fetchAuctions();
  };

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
          {/* TEST TO MAP ALL AUCTIONS  */}
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

        {/* TEST FUNCTION TO ADD OBJECT TO API DB */}
        <Row>
          <Col className="mt-4 d-flex flex-column">
            <Form
              onSubmit={handleSubmit}
              className="align-self-center justify-content-center w-50 border border-black p-4"
            >
              <Form.Group controlId="formTitle">
                <Form.Label>Titel:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ange en titel"
                  name="Title"
                  value={newAuction.Title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {/* Wrong format in datetime-local */}
              <Form.Group>
                <Form.Label>Start Datum:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="StartDate"
                  value={new Date()
                    .toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" })
                    .slice(0, 16)}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Beskrivning:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Beskriv varan"
                  name="Description"
                  value={newAuction.Description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEndDate">
                <Form.Label>Slut datum:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="EndDate"
                  value={new Date(newAuction.EndDate)
                    .toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" })
                    .slice(0, 16)}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formStartingPrice">
                <Form.Label>Utropspris:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ange utropspris"
                  name="StartingPrice"
                  value={newAuction.StartingPrice}
                  onChange={handleChange}
                  required
                  inputMode="numeric"
                />
              </Form.Group>
              <Form.Group controlId="formCreatedBy">
                <Form.Label>Säljare:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="CreatedBy"
                  value={newAuction.CreatedBy}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Skapa Annons
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
