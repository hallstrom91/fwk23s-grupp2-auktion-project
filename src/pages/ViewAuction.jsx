import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";

// components
import LoadingSpinner from "../components/LoadingSpinner";
import ViewAuctionInfo from "../components/ViewAuctionInfo";
import ViewAuctionBids from "../components/ViewAuctionBids";
import PlaceBidBtn from "../components/PlaceBidBtn";

import DeleteAuctionBtn from "../components/DeleteAuctionBtn";
// import functions from AuctionAPI
import { useAuctionApi } from "../AuctionApi";

export default function ViewAuction() {
  const { fetchSingleAuction, fetchAuctionBids, calculateTimeLeft } =
    useAuctionApi();

  //useParams & useNavigate
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [auction, setAuction] = useState(null);
  const [leadingBid, setLeadingBid] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // function to connect auction with bids and get highest bid.
  const fetchAuctionData = async () => {
    // define timer for error messages
    let timer;
    try {
      const auction = await fetchSingleAuction(id);
      const bids = await fetchAuctionBids(id);

      auction.bids = bids;

      // get highest bid to display
      const highestBid = findHighestBid(bids);

      setAuction(auction);
      setLeadingBid(highestBid);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch auction and bids", error);
      setLoading(false);
      setError("Hämtning av auktionen misslyckades");
      timer = setTimeout(() => {
        setError("");
      }, 10000);
    }
  };

  // mount at render
  useEffect(() => {
    fetchAuctionData(id);
  }, [id]);

  const handleDelete = () => {
    navigate("/");
  };

  // Find and display leading / highest bid for auction
  const findHighestBid = (bids) => {
    if (!bids || bids.length === 0) {
      return null;
    }
    const sortedBids = [...bids].sort((a, b) => b.Amount - a.Amount);
    const leadingBid = sortedBids[0];
    return leadingBid;
  };
  // render PlaceBidBtn.jsx only if auction is active
  const auctionTimeLeft = auction ? calculateTimeLeft(auction.EndDate) : {};
  return (
    <>
      <Container className="p-4">
        <Row>
          {/* error message if api call dont work , app can crash also*/}
          <span>
            {error && <p className="text-center text-danger">{error}</p>}
          </span>
          {auction && (
            <Col>
              <h1 className="text-center">{auction.Title}</h1>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            {/* button as link to view more details of specific auction */}
            <Button
              as={Link}
              to="/auctions"
              variant="outline-dark"
              className="mb-4"
            >
              Tillbaka
            </Button>
          </Col>
        </Row>
        <Row>
          {/* display animated loading at slow render */}
          <Col xs={8}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div>
                <ViewAuctionInfo auction={auction} leadingBid={leadingBid} />
                {/* block placebidbtn & deleteauctionbtn when auction is closed */}
                {auction && auctionTimeLeft.days >= 0 && (
                  <div className="d-flex justify-content-between align-items-center pt-3">
                    <PlaceBidBtn auction={auction} />
                    <DeleteAuctionBtn
                      auction={auction}
                      onDelete={handleDelete}
                    />
                  </div>
                )}
              </div>
            )}
          </Col>
          <Col xs={4}>
            {/* display loading if needed, or bids, if auction has ended, display none */}
            {loading
              ? null
              : auction &&
                auctionTimeLeft.days >= 0 && (
                  <ViewAuctionBids auction={auction} leadingBids={leadingBid} />
                )}
          </Col>
        </Row>
        {!auction && loading && <LoadingSpinner />}
        {!auction && !loading && (
          /* if no auctions can be found, show message */
          <p className="text-center">Auktionen kan inte hittas...</p>
        )}
      </Container>
    </>
  );
}
