import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddAuction = ({ onCreateAuction }) => {
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
    onCreateAuction(newAuction);
    setNewAuction({
      Title: "",
      Description: "",
      EndDate: "",
      StartingPrice: "",
      CreatedBy: "",
    });
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 12); 

  return (
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
      <Form.Group controlId="formStartDate">
        <Form.Label>Start datum:</Form.Label>
        <Form.Control
          type="datetime-local"
          name="StartDate"
          value={new Date().toISOString().slice(0, 16)}
          required
          readOnly
        />
      </Form.Group>
      <Form.Group controlId="formEndDate">
        <Form.Label>Slut datum:</Form.Label>
        <Form.Control
          type="datetime-local"
          name="EndDate"
          min={new Date().toISOString().slice(0, 16)}
          max={maxDate.toISOString().slice(0, 16)} 
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formCreatedBy">
        <Form.Label>Kontaktuppgifter (email):</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ange email"
          name="CreatedBy"
          value={newAuction.CreatedBy}
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
      <Button variant="primary" type="submit" className="mt-3">
        Skapa Annons
      </Button>
    </Form>
  );
};

export default AddAuction;
