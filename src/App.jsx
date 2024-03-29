import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Switch from "./Switch";

// import AuctionProvider from AuctionApi.jsx
import { AuctionProvider } from "./AuctionApi";

function App() {
  return (
    <AuctionProvider>
      <>
        <Navigation />
        <Switch />
        <Footer />
      </>
    </AuctionProvider>
  );
}

export default App;
