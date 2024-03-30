import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';
import React, { useState, useEffect } from 'react';
import { ButtonGroup } from 'react-bootstrap';

function AuctionContainer({ auction = {} }) {

  const calculateTimeLeft = () => {
    const difference = +new Date(auction.EndDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [auction.EndDate]);

  return (
   
    <div className="auction-card">
      <Card className='custom-card' style={{ width: '18rem', marginBottom: '1rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{auction.Title}</Card.Title>
          <Card.Text>
            <p className='description'><strong>Beskrivning:</strong> {auction.Description}</p>
            <p><strong>Startdatum:</strong> {auction.StartDate}</p>
            <p><strong>Slutdatum:</strong> {auction.EndDate}</p>
            <p className='time-left'>
            <strong >Tid Kvar:</strong> {Object.keys(timeLeft).length ? `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s kvar` : "Auction ended"}
          </p>
            <p><strong>Startbud:</strong> {auction.StartingPrice}</p>
            <p><strong>Säljare:</strong> {auction.CreatedBy}</p>
          </Card.Text>
          <Card.Text>
            <strong>Tidigare bud:</strong>
            <ul>
              {auction.Bids?.map((bid) => (
                <li key={bid.BidID}>{bid.Amount} kr av {bid.Bidder}</li>
              ))}
            </ul>
          </Card.Text>
          <ButtonGroup className='custom-btn-group'>
            <Button variant="primary">Lägg bud</Button> <br />
            <Button variant="danger">Ta bort bud</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
   
  );
}

export default AuctionContainer;