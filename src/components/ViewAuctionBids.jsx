import React, { useState, useEffect } from "react";
import { Card, Button, ButtonGroup, ListGroup } from "react-bootstrap";

export default function ViewAuctionBids({ auction, leadingBids }) {
  return (
    <>
      <Card bg="secondary">
        <Card.Header className="text-center text-black">
          Tidigare Bud:
        </Card.Header>
        {/* show leading bid on top, if any bids */}
        {leadingBids && (
          <ListGroup className="border-0">
            <ListGroup.Item>
              <strong>Ledande Bud: </strong>
              {leadingBids.Amount} kr
            </ListGroup.Item>
          </ListGroup>
        )}

        {auction.bids.length > 0 ? (
          /* if bids exists, show all. */
          <ListGroup variant="ol" numbered>
            {auction.bids.map((bid) => (
              <ListGroup.Item as="li" key={bid.BidID}>
                {bid.Amount} kr av {bid.Bidder}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          // if no bids exists, show text
          <ListGroup>
            <ListGroup.Item className="text-center">
              Inga bud ännu.
            </ListGroup.Item>
          </ListGroup>
        )}
      </Card>
    </>
  );
}
