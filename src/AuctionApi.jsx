import React, { createContext, useContext, useState } from "react";

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  /*
=========================================
GET Data from API DB
=========================================
*/
  // GET all auctions to display in Auctions.jsx
  const fetchAuctions = async () => {
    try {
      const response = await fetch(
        "https://auctioneer.azurewebsites.net/auction/z2a/"
      );
      const auctions = await response.json();
      return auctions;
    } catch (error) {
      console.error("Failed to fetch all auctions.", error);
      throw error;
    }
  };
  // GET single auction to display in ViewAuction.jsx
  const fetchSingleAuction = async (AuctionID) => {
    try {
      const response = await fetch(
        `https://auctioneer.azurewebsites.net/auction/z2a/${AuctionID}`
      );
      const auction = await response.json();
      return auction;
    } catch (error) {
      console.error(`Failed to fetch auction with ID #${AuctionID}`, error);
      throw error;
    }
  };

  // collect all bids connected to a specific auction in ViewAuction.jsx
  const fetchAuctionBids = async (AuctionID) => {
    try {
      const response = await fetch(
        `https://auctioneer.azurewebsites.net/bid/z2a/${AuctionID}`
      );
      const bids = await response.json();
      return bids;
    } catch (error) {
      console.error("Failed to fetch bids.", error);

      throw error;
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
        console.log("Auktionen är nu skapad.");
      }
    } catch (error) {
      console.error("failed to created new auction", error);
    }
  };

  // place a bid on auction with POST, collect userBid from frontend-form in component AuctionContainer.jsx
  const createBid = async (userBid) => {
    console.log("userbid POST", userBid);
    userBid.GroupCode = "z2a";
    try {
      const response = await fetch(
        "https://auctioneer.azurewebsites.net/bid/z2a/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userBid),
        }
      );
      if (response.ok) {
        console.log("Bud har placerats.");
      }
    } catch (error) {
      console.error("Tyvärr så gick det inte att lägga ett bud just nu.");
    }
  };

  /*
=========================================
PUT Data to API DB
=========================================
*/

  const updateAuction = async (update) => {
    const { AuctionID, ...updateData } = update;
    updateData.StartDate = new Date().toISOString().slice(0, 16);
    const updateURL = `https://auctioneer.azurewebsites.net/auction/z2a/${AuctionID}`;
    try {
      const response = await fetch(updateURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      if (response.ok) {
        console.log("Auktionen har uppdaterats.");
      }
    } catch (error) {
      console.error("Misslyckad uppdatering av auktionen.");
    }
  };

  /*
=========================================
  DELETE Data from API DB
=========================================
*/

  const deleteAuction = async (AuctionID) => {
    try {
      const response = await fetch(
        `https://auctioneer.azurewebsites.net/auction/z2a/${AuctionID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log(`Auktionen med ID #${AuctionID} har blivit borttagen.`);
      } else {
        console.error(
          `Tyvärr gick det inte att ta bort Auktionen med ID #${AuctionID}`
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  /*
=========================================
Time Calc & Converter
=========================================
*/

  // function to calculate time left
  const calculateTimeLeft = (EndDate) => {
    const difference = +new Date(EndDate) - +new Date();
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

  // format start/end-date to display static
  const formatStaticDate = (EndDate) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(EndDate).toLocaleDateString("sv-SE", options);
  };

  return (
    <AuctionContext.Provider
      value={{
        createAuction,
        fetchAuctions,
        fetchSingleAuction,
        fetchAuctionBids,
        deleteAuction,
        createBid,
        updateAuction,
        calculateTimeLeft,
        formatStaticDate,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuctionApi = () => useContext(AuctionContext);
