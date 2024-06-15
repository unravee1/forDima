import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-center md:text-left">
          &copy; {new Date().getFullYear()} Gym Website. All rights reserved.
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/" className="text-gray-400 hover:text-white">
            Home
          </Link>
          <Link to="/about" className="text-gray-400 hover:text-white">
            About
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-white">
            Contact
          </Link>
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

