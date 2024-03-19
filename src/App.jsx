import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Switch from "./Switch";

function App() {
  return (
    <>
      <Navigation />
      <Switch />
      <Footer />
    </>
  );
}

export default App;
