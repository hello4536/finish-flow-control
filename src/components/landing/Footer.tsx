import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="border-t py-12 bg-blue-950">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">F</span>
              </div>
              <div className="text-xl font-bold">Finivi</div>
            </div>
            <p className="text-sm mb-4 text-slate-50">
              Comprehensive finishing department management platform for modern businesses.
            </p>
            <p className="text-sm text-slate-50">
              &copy; {new Date().getFullYear()} Finivi. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="font-semibold mb-3 text-orange-500">Product</h3>
              <ul className="space-y-2">
                <li><Link to="#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link to="#pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Testimonials</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-orange-500">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">About</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;