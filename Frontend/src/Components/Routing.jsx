import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexHome from "./homepage/Index-home";

// Pages

// You can add these placeholder pages or replace with your actual components
const About = () => (
  <div className="p-4 bg-white text-gray-500 rounded-lg shadow">
    About Page Content
  </div>
);
const Services = () => (
  <div className="p-4 bg-white rounded-lg shadow">Services Page Content</div>
);
const Team = () => (
  <div className="p-4 bg-white rounded-lg shadow">Team Page Content</div>
);

function Routing() {
  return (
    <div   style={{
      marginLeft: "calc(var(--sidebar-width))", // Fallback to 60px
      // paddingLeft: "60px", // Fallback to 60px
    }} >

    <Routes>
      <Route path="/" element={<IndexHome />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/team" element={<Team />} />
    </Routes>
    </div>
    // <>
    // Hello
    // </>
  );
}

export default Routing;
