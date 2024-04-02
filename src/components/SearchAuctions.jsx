import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
export default function SearchAuctions({ auctions, setFilterAuctions }) {
  const [searchQuery, setSearchQuery] = useState("");

  // handle search
  const handleSearch = () => {
    const filtered = auctions.filter((auction) =>
      auction.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterAuctions(filtered);
  };

  /*   const handleSearch = () => {
    onSearch(searchQuery);
  }; */
  return (
    <>
      <Form className="d-flex">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Sök efter auktioner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="sm"
          />
        </Form.Group>
        <Button
          size="sm"
          variant="outline-dark"
          className="mb-2 mx-2"
          onClick={handleSearch}
        >
          Sök
        </Button>
      </Form>
    </>
  );
}
