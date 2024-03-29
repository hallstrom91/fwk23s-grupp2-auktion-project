import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuctionApi } from "../AuctionApi";

export default function DeleteAuctionBtn({ auction, onDelete }) {
  const { deleteAuction } = useAuctionApi();
  const [displayModal, setDisplayModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");

  const handleDelete = () => {
    if (deleteKey === auction.CreatedBy) {
      deleteAuction(auction.AuctionID);
      setDisplayModal(false);
      onDelete();
    } else {
      alert("Ajja Bajja, inte din annons!");
    }
  };

  return (
    <>
      {/*  Button to display in auction item to delete item from API */}
      <Button
        size="sm"
        variant="outline-danger"
        onClick={() => setDisplayModal(true)}
      >
        Ta Bort
      </Button>

      {/* Popup Modal if button is clicked, to verify delete of auction item. */}
      <Modal show={displayModal} onHide={() => setDisplayModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Ta bort <strong className="text-danger">{auction.Title}</strong>?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ange din <strong>privata</strong> nyckel för att radera annonsen.
          </p>
          <Form.Control
            type="text"
            size="sm"
            value={deleteKey}
            onChange={(e) => setDeleteKey(e.target.value)}
            placeholder="Ange CreatedBy-värdet"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="outline-dark"
            onClick={() => setDisplayModal(false)}
          >
            Avbryt
          </Button>
          <Button size="sm" variant="danger" onClick={handleDelete}>
            Radera
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
