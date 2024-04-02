import React, { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useAuctionApi } from "../AuctionApi";

export default function UpdateAuctionBtn({ auction, onUpdate }) {
  const { updateAuction } = useAuctionApi();
  const [displayModal, setDisplayModal] = useState(false);
  const [updateKey, setUpdateKey] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStartPrice, setNewStartPrice] = useState("");
  const [error, setError] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  // function for datetime-local input
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 12);

  // handle update of auction
  const handleUpdate = () => {
    // check update "token"-verification
    if (updateKey === auction.CreatedBy)
      if (
        !newTitle.trim().length &&
        !newDescription.trim().length &&
        !newStartPrice.trim().length
      ) {
        // check so no empty values are in input, including "white space"
        setError("Titel & Beskrivning är obligatoriskt.");

        setTimeout(() => {
          setError("");
        }, 3000);
        // cancel function if no values
        return;
      } else if (!newTitle.trim().length) {
        setError("Titel är obligatoriskt");

        setTimeout(() => {
          setError("");
        }, 3000);
        // cancel function if no values
        return;
      } else if (!newDescription.trim().length) {
        setError("Beskrivning är obligatoriskt.");
        setTimeout(() => {
          setError("");
        }, 3000);
        // cancel function if no values
        return;
      } else if (!newStartPrice.trim().length) {
        setError("Utropspris måste vara högre eller lägre än tidigare.");
        setTimeout(() => {
          setError("");
        }, 3000);
        // cancel function if no values
        return;
      }
    // collect values for update req
    const updateValues = {
      AuctionID: auction.AuctionID,
      CreatedBy: updateKey,
      Title: newTitle,
      Description: newDescription,
      StartingPrice: newStartPrice,
      StartDate: newStartDate,
      EndDate: newEndDate,
    };
    console.log("updatvalues", updateValues);
    if (updateKey === auction.CreatedBy) {
      updateAuction(updateValues)
        .then(() => {
          setDisplayModal(false);
          onUpdate();
        })
        .catch((error) => {
          console.error("Uppdatering av auktion misslyckades.", error);
          setError("Det gick tyvärr inte att uppdatera auktionen just nu.");
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    } else {
      // if no key match
      setError("Du saknar behörighet.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  // clear input-fields at close function
  const clearFields = () => {
    setNewDescription("");
    setNewStartPrice("");
    setNewTitle("");
    setDisplayModal(false);
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline-primary"
        onClick={() => setDisplayModal(true)}
      >
        Redigera
      </Button>
      <Modal show={displayModal} onHide={() => setDisplayModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Redigera {auction.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display error message if needed */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="auth">
            <Form.Label className="pt-2">
              <strong>Verifikation: </strong>
              <small> (CreatedBy)</small>
            </Form.Label>

            <Form.Control
              type="text"
              size="sm"
              value={updateKey}
              onChange={(e) => setUpdateKey(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editTitle">
            {/* Edit title - input */}
            <Form.Label className="pt-2">
              <strong>Titel:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Din nya titel här."
            />
          </Form.Group>
          <Form.Group controlId="editDescription">
            {/* Edit description - input */}
            <Form.Label className="pt-2">
              <strong>Beskrivning:</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              size="sm"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Din nya beskrivning här."
            />
          </Form.Group>
          <Form.Group controlId="editPrice">
            {/* Edit starting price - input */}
            <Form.Label className="pt-2">
              <strong>Utropspris:</strong>
            </Form.Label>
            <Form.Control
              type="number"
              size="sm"
              value={newStartPrice}
              onChange={(e) => setNewStartPrice(e.target.value)}
              placeholder="Ditt nya pris här, överdriv inte."
            />
          </Form.Group>
          {/* Edit new start date */}
          <Form.Group>
            <Form.Label className="pt-2">
              <strong>Start Datum:</strong>
            </Form.Label>
            <Form.Control
              type="datetime-local"
              size="sm"
              value={new Date().toISOString().slice(0, 16)}
              onChange={(e) => setNewStartDate(e.target.value)}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            {/* Edit new end date */}
            <Form.Label className="pt-2">
              <strong>Slut Datum:</strong>
            </Form.Label>
            <Form.Control
              type="datetime-local"
              size="sm"
              min={new Date().toISOString().slice(0, 16)}
              max={maxDate.toISOString().slice(0, 16)}
              onChange={(e) => setNewEndDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" size="sm" onClick={clearFields}>
            Avbryt
          </Button>
          <Button variant="outline-success" size="sm" onClick={handleUpdate}>
            Uppdatera
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
