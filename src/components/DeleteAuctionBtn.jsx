import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useAuctionApi } from "../AuctionApi";

export default function DeleteAuctionBtn({ auction, onDelete, leadingBids }) {
  const { deleteAuction } = useAuctionApi();
  const [displayModal, setDisplayModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const [error, setError] = useState("");
  const [disableInput, setDisableInput] = useState(false);

  // useEffect to check if any bids, disable input-fields.
  useEffect(() => {
    if (leadingBids && leadingBids.Amount) {
      setDisableInput(true);
    } else {
      setDisableInput(false);
    }
  }, [leadingBids]);

  // function to handle delete of auction
  const handleDelete = () => {
    if (!deleteKey) {
      // display error if "CreatedBy-value" is missing or wrong.
      setError("Ange ditt hemliga token för att radera auktionen.");

      setTimeout(() => {
        setError("");
      }, 3000);
      // cancel function if token is missing
      return;
    }

    // if all is correct, delete auction or give error
    if (deleteKey === auction.CreatedBy) {
      deleteAuction(auction.AuctionID)
        .then(() => {
          setDisplayModal(false);
          onDelete();
        })
        .catch((error) => {
          console.error("Kunde inte ta bort auktionen.", error);
          setError("Kunde inte ta bort auktionen, försök igen.");
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };
  const clearFields = () => {
    setDeleteKey("");
    setDisplayModal(false);
  };

  return (
    <>
      {/*  Button to display in ViewAuction.jsx to remove active auction with no bids*/}
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
          {/* Display error msg if input-empty */}
          {error && (
            <Alert variant="danger" className="mb-2">
              {error}
            </Alert>
          )}
          <p>
            Ange din <strong>privata</strong> nyckel för att radera annonsen.
          </p>
          {/* Input for "secret" key to delete auction */}
          <Form.Control
            type="text"
            size="sm"
            value={deleteKey}
            onChange={(e) => setDeleteKey(e.target.value)}
            placeholder="Ange CreatedBy-värdet"
            disabled={disableInput}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* Display Buttons Delete & Close */}
          <Button size="sm" variant="outline-dark" onClick={clearFields}>
            Avbryt
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={handleDelete}
            disabled={disableInput}
          >
            Radera
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
