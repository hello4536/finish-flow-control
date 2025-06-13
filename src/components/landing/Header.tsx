
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

  const scrollToCompany = () => {
    // For now, just scroll to bottom of page or implement company section
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/831be762-1da7-4615-9dac-d59cc2386de3.png" 
            alt="Finivo Logo" 
            className="h-16 object-contain" 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/features" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          
          <Link 
            to="/pricing" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          
          <Link 
            to="/resources"
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
          >
            Knowledge Hub
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          
          <button 
            onClick={scrollToCompany}
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
          >
            Company
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </button>
        </nav>
        
        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-gray-600 hover:text-blue-600" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleSignOut} 
                className="text-gray-600 hover:text-blue-600"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
              <Button 
                asChild 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-6"
              >
                <Link to="/auth/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/features" 
              className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/resources"
              className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Knowledge Hub
            </Link>
            <button 
              onClick={() => {
                scrollToCompany();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors text-left" 
            >
              Company
            </button>
            
            <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
              {user ? (
                <>
                  <Button 
                    asChild 
                    className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center" 
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
                    className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/auth/signup">Get Started</Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full justify-center" 
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
