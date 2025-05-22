
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container px-4 md:px-6 py-12 mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 h-16 overflow-visible">
              <img 
                src="/lovable-uploads/831be762-1da7-4615-9dac-d59cc2386de3.png" 
                alt="Finivo Logo" 
                className="h-20 object-contain -my-2" /* Increased to h-20 (80px) with negative margins */
              />
            </Link>
            <p className="text-sm mb-4 text-gray-600">
              Comprehensive finishing department management platform for modern businesses.
            </p>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Finivi. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Product</h3>
              <ul className="space-y-3">
                <li><Link to="/#features" className="text-sm text-gray-600 hover:text-blue-500">Features</Link></li>
                <li><Link to="/#pricing" className="text-sm text-gray-600 hover:text-blue-500">Pricing</Link></li>
                <li><Link to="/#testimonials" className="text-sm text-gray-600 hover:text-blue-500">Testimonials</Link></li>
                <li><Link to="/#faq" className="text-sm text-gray-600 hover:text-blue-500">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-sm text-gray-600 hover:text-blue-500">About</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-600 hover:text-blue-500">Contact</Link></li>
                <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-500">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-gray-600 hover:text-blue-500">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
