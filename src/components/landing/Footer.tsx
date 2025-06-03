
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Finivo
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Comprehensive finishing department management platform for modern businesses. 
              Streamline operations, improve quality, and boost productivity.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-sm">T</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-sm">L</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-sm">G</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-white">Features</h3>
            <ul className="space-y-4">
              <li><Link to="/#features" className="text-gray-400 hover:text-white transition-colors">Job Management</Link></li>
              <li><Link to="/#features" className="text-gray-400 hover:text-white transition-colors">Inventory Tracking</Link></li>
              <li><Link to="/#features" className="text-gray-400 hover:text-white transition-colors">Quality Control</Link></li>
              <li><Link to="/#features" className="text-gray-400 hover:text-white transition-colors">Compliance</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-white">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Finivo. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
