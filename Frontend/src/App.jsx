import { useState } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Routing from "./Components/Routing";
import Footer from "./Components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Routes> */}
        <div className="flex">
          <Sidebar />
          <Routing />
        </div>
        <Footer />
        {/* </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
