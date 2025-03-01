import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexHome from "./homepage/Index-home";
import ContactUs from "./Contact/ContactUs";
import Members from "./Team/Members";
import CampusAmbassadorProgram from "./CampusAmbassador/CampusAmbassadorProgram";
import AuthForm from "./Profile/AuthForm";
import ProfileRoute from "./Profile/ProfileRoute";
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


function Routing() {
  return (
   <div
  style={{
    paddingLeft: "calc(var(--sidebar-width) + 0px)", // Ensure px unit
    width: "100%",
  }}
>


    <Routes>
      <Route path="/" element={<IndexHome />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/team" element={ <Members/>} />
      <Route path="/campus-ambassador" element={ <CampusAmbassadorProgram/>} />
      <Route path="/profile" element={< ProfileRoute/>} />
      <Route path="/contact" element={<ContactUs/>}/>
    </Routes>
    </div>
    // <>
    // Hello
    // </>
  );
}

export default Routing;
