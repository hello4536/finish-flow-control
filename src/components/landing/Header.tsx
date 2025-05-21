
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-500">
            Fini<span className="text-blue-500">v</span>i
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="group relative">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
              Platform
            </Link>
            <span className="inline-block ml-1 opacity-60">▾</span>
          </div>
          
          <Link to="/#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
            Pricing
          </Link>
          
          <div className="group relative">
            <Link to="/woodworking-finishing" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
              Solutions
            </Link>
            <span className="inline-block ml-1 opacity-60">▾</span>
          </div>
          
          <div className="group relative">
            <Link to="/auto-body-finishing" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
              Resources
            </Link>
            <span className="inline-block ml-1 opacity-60">▾</span>
          </div>
          
          <div className="group relative">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
              Company
            </Link>
            <span className="inline-block ml-1 opacity-60">▾</span>
          </div>
          
          <Link to="/blog" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
            Blog
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:text-blue-500"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-md">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleSignOut} 
                className="rounded-md hover:bg-blue-50"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <div className="text-sm text-gray-600">
                Log in <span className="mx-1 text-gray-300">|</span> 
                <Link to="/auth/signin" className="text-blue-500 hover:text-blue-700 ml-1">
                  Book a demo
                </Link>
              </div>
              <Button asChild size="sm" className="rounded-full bg-blue-500 hover:bg-blue-600 px-6">
                <Link to="/auth/signup">Try for free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/woodworking-finishing" 
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Woodworking
            </Link>
            <Link 
              to="/auto-body-finishing" 
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Auto Body
            </Link>
            <Link 
              to="/#pricing" 
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            
            <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
              {user ? (
                <>
                  <Button 
                    asChild 
                    className="w-full justify-center rounded-md bg-blue-900 hover:bg-blue-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center rounded-md"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    asChild 
                    className="w-full justify-center rounded-md bg-blue-900 hover:bg-blue-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/auth/signup">Sign Up</Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full justify-center rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/auth/signin">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
