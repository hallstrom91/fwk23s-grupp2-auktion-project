import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useAuctionApi } from "../AuctionApi";

export default function PlaceBidBtn({ auction, leadingBids }) {
  const { createBid } = useAuctionApi();
  const [displayModal, setDisplayModal] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [bidder, setBidder] = useState("");
  const [lowBidMsg, setLowBidMsg] = useState("");

  const handleBid = () => {
    // if both bid & name is missing
    if (!bidAmount && !bidder) {
      setLowBidMsg("Ange bud & namn...");

      setTimeout(() => {
        setLowBidMsg("");
      }, 3000);
      return;
    } else if (!bidAmount) {
      // if empty bid input
      setLowBidMsg("Ange ett belopp...");

      setTimeout(() => {
        setLowBidMsg("");
      }, 3000);

      // cancel function if bid is missing
      return;
    } else if (!bidder) {
      // if empty name input empty
      setLowBidMsg("Ange ditt namn...");

      setTimeout(() => {
        setLowBidMsg("");
      }, 3000);
      return;
    }

    // collect info
    const userBid = {
      AuctionID: auction.AuctionID,
      Amount: bidAmount,
      Bidder: bidder,
    };
    // prevent bid if smaller than leading bid
    if (parseFloat(bidAmount) <= parseFloat(leadingBids?.Amount)) {
      setLowBidMsg("Budet är för lågt, försök igen.");

      //timer to remove low-bid msg
      setTimeout(() => {
        setLowBidMsg("");
      }, 5000);
      // cancel function if bid is to low.
      return;
    }
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
          {leadingBids && (
            <Modal.Title>Lägg Bud på {auction.Title}</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          <small className="">Ledande Bud: {leadingBids?.Amount} kr</small>
          {lowBidMsg && (
            <Alert variant="danger" className="mb-2">
              {lowBidMsg}
            </Alert>
          )}
          <Form.Control
            type="text"
            size="sm"
            value={bidder}
            onChange={(e) => setBidder(e.target.value)}
            placeholder="Ange namn"
            className="mb-2 mt-2"
            required
          />
          <Form.Control
            type="number"
            size="sm"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Ange belopp"
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
