import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import About from './About';
import Contact from './Contact';


const Home = () => {
    
    return (
        
      <div className="flex flex-col h-screen">
        {/* Navbar at the top */}
        <Navbar />

        <div className="flex flex-grow ">
          {/* Sidebar on the left */}
          <Sidebar />

          {/* Main content area */}
          <main className="flex-grow bg-gray-100 p-4">
          <Routes>
                        {/* Default route */}
                        <Route path="/" element={<MainContent />} />
                        {/* Route for About page */}
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
          </main>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    );
};

export default Home;
