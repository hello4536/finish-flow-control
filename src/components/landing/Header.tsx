
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";

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
          <h1 className="text-2xl font-bold text-blue-900">
            Fini<span className="text-orange-500">v</span>i
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors">
            Home
          </Link>
          <Link to="/woodworking-finishing" className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors">
            Woodworking
          </Link>
          <Link to="/auto-body-finishing" className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors">
            Auto Body
          </Link>
          <Link to="/#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors">
            Pricing
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:text-blue-900"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Button asChild variant="outline" size="sm" className="rounded-md">
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
              <Button asChild variant="outline" size="sm" className="rounded-md">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="rounded-md bg-blue-900 hover:bg-blue-800">
                <Link to="/auth/signup">Sign Up</Link>
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
