import { useState } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Routing from "./Components/Routing";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Routes> */}
        <div className="flex">
          <Sidebar />
          <Routing />
        </div>
        {/* </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
