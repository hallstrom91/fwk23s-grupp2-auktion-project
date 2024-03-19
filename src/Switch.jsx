import React from "react";
import { Routes, Route } from "react-router-dom";

// pages import for switch / navbar-links
import Home from "./pages/Home";
import Auctions from "./pages/Auctions";

export default function Switch() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/" element />
        <Route path="/" element />
      </Routes>
    </>
  );
}
