import React, { createContext, useContext, useState } from "react";

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [auctions, setAuctions] = useState([]);
  const [bids, setBids] = useState([]);
  const [auctionBids, setAuctionBids] = useState({});

  /*
=========================================
GET Data from API DB
=========================================
*/

  const fetchAuctions = async () => {
    try {
      const response = await fetch(
        "https://auctioneer.azurewebsites.net/auction/z2a"
      );
      const data = await response.json();
      for (const auction of data) {
        const bids = await fetchAuctionBids(auction.AuctionID);
        auction.bids = bids;
      }
      setAuctions(data);
    } catch (error) {
      console.error("Failed to fetch auctions", error);
    }
  };

  // collect all bids connected to a specific auction-item
  const fetchAuctionBids = async (auctionID) => {
    try {
      const response = await fetch(
        `https://auctioneer.azurewebsites.net/bid/z2a/${auctionID}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch bids.");
      return [];
    }
  };

  /*
=========================================
POST Data to API DB
=========================================
*/

  // create auction with POST, collect userData from frontend-form in component AddAuction.jsx
  const createAuction = async (userData) => {
    try {
      //add groupcode to POST-req
      userData.GroupCode = "z2a";
      // Add automatic startdate for auction (current day/time)
      userData.StartDate = new Date().toISOString().slice(0, 16);

      const response = await fetch(
        "https://auctioneer.azurewebsites.net/auction/z2a",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        //call fetchAuctions to update and include new object in render
        fetchAuctions();
      }
    } catch (error) {
      console.error("Failed to create auction", error);
    }
  };

  // place a bid on auction with POST, collect userBid from frontend-form in component AuctionContainer.jsx
  const createBid = async (userBid) => {
    try {
      const response = await fetch(
        "https://auctioneer.azurewebsites.net/bid/z2a",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userBid),
        }
      );
      if (response.ok) {
        fetchAuctionBids(userBid.AuctionID);
      }
    } catch (error) {
      console.error("Failed to place a bid.");
    }
  };

  /*
=========================================
DELETE Data from API DB
=========================================
*/

  const deleteAuction = async (auctionID) => {
    try {
      const response = await fetch(
        `https://auctioneer.azurewebsites.net/auction/z2a/${auctionID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log(`Auction with ID ${auctionID} has been deleted.`);
      } else {
        console.error(`Failed to delete Auction with ID ${auctionID}`);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <AuctionContext.Provider
      value={{
        fetchAuctions,
        fetchAuctionBids,
        createAuction,
        deleteAuction,
        createBid,
        auctionBids,
        auctions,
        bids,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuctionApi = () => useContext(AuctionContext);
