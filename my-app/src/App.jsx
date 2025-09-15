import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomePage from "./Components/pages/HomePage";
import AboutPage from "./Components/pages/AboutPage";
import PropertiesPage from "./Components/pages/PropertiesPage";
import PropertyDetailPage from "./Components/pages/PropertyDetailPage";
import ServicesPage from "./Components/pages/ServicesPage";
import BlogPage from "./Components/pages/BlogPage";
import BlogDetailPage from "./Components/pages/BlogDetailPage";
import EventDetailPage from "./Components/pages/EventDetailPage";
import ContactPage from "./Components/pages/ContactPage";
import WhatsAppButton from "./Components/WhatsAppButton";
import Header2 from "./Components/Header2";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* <Header /> */}
        <Header2 />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
