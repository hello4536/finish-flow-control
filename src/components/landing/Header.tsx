import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Home } from "lucide-react";
const Header: React.FC = () => {
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  return <header className="border-b sticky top-0 z-50 bg-blue-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-slate-50">
            Fini<span className="text-accent">v</span>i
          </h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Button asChild variant="ghost" size="sm" className="text-slate-50 hover:text-primary">
            <Link to="/"><Home className="mr-2 h-4 w-4" />Home</Link>
          </Button>
          <Link to="/woodworking-finishing" className="text-sm font-medium text-slate-50 hover:text-primary transition-colors">Woodworking Finishing</Link>
          <Link to="/auto-body-finishing" className="text-sm font-medium text-slate-50 hover:text-primary transition-colors">Auto Body Finishing</Link>
          <Link to="/#pricing" className="text-sm font-medium text-slate-50 hover:text-primary transition-colors">Pricing</Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          {user ? <>
              <Button asChild variant="outline" size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button size="sm" variant="ghost" onClick={handleSignOut} className="bg-orange-600 hover:bg-orange-500 text-slate-50">
                Sign Out
              </Button>
            </> : <>
              <Button asChild variant="outline" size="sm">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </>}
        </div>
      </div>
    </header>;
};
export default Header;