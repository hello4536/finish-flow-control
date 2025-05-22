
import React from "react";
import { Link } from "react-router-dom";

const LogoLink: React.FC = () => {
  return (
    <Link to="/dashboard" className="flex items-center">
      <img 
        src="/lovable-uploads/a1f0f208-8d98-4c76-bf9a-d97b8ee7ffea.png" 
        alt="Finivo Logo" 
        className="h-8"
      />
    </Link>
  );
};

export default LogoLink;
