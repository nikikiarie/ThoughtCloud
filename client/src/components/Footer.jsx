import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-300 text-gray-800 py-8 shadow-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-indigo-600">ThoughtCloud</h2>
            <p className="text-gray-600 mt-2">Your thoughts, our platform.</p>
          </div>

          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
            <li>
              <Link to="/" className="hover:text-indigo-600">Home</Link>
            </li>
            <li>
              <Link to="#features" className="hover:text-indigo-600">Features</Link>
            </li>
            <li>
              <Link to="#pricing" className="hover:text-indigo-600">Pricing</Link>
            </li>
            <li>
              <Link to="#about" className="hover:text-indigo-600">About</Link>
            </li>
            <li>
              <Link to="#contact" className="hover:text-indigo-600">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-4 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} ThoughtCloud. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
