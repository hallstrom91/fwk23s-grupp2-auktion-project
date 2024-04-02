import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuctionApi } from "../AuctionApi";

export default function PlaceBidBtn({ auction }) {
  const { createBid } = useAuctionApi();
  const [displayModal, setDisplayModal] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [bidder, setBidder] = useState("");

  const handleBid = () => {
    const userBid = {
      AuctionID: auction.AuctionID,
      Amount: bidAmount,
      Bidder: bidder,
    };
    createBid(userBid);
    setBidAmount("");
    setBidder("");
    setDisplayModal(false);
    // to refresh page after successful bid
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <>
      {/* Button to open popup-modal to place bid */}
      <Button
        size="sm"
        variant="outline-success"
        onClick={() => setDisplayModal(true)}
      >
        Lägg Bud
      </Button>

      {/* Modal popup layout */}
      <Modal show={displayModal} onHide={() => setDisplayModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lägg Bud på {auction.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            size="sm"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Ange belopp"
            className="mb-2"
            required
          />
          <Form.Control
            type="text"
            size="sm"
            value={bidder}
            onChange={(e) => setBidder(e.target.value)}
            placeholder="Ange namn"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setDisplayModal(false)}
          >
            Avbryt
          </Button>
          <Button variant="success" size="sm" onClick={handleBid}>
            Lägg Bud
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
