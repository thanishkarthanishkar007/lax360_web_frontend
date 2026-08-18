import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./ui/ScrollToTop";
import About from "./pages/about/About";
import Service from "./pages/service/Service";
import Contact from "./pages/contact/Contact";
import EnquiryPopup from "./components/home/EnquireyPopUp";
import Careers from "./pages/carreers/Careers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <EnquiryPopup />
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
