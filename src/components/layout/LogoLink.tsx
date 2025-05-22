import React from "react";
import { Link } from "react-router-dom";
const LogoLink: React.FC = () => {
  return <Link to="/dashboard" className="flex items-center h-16 overflow-visible">
      <img src="/lovable-uploads/831be762-1da7-4615-9dac-d59cc2386de3.png" alt="Finivo Logo" className="h-30 object-contain -my-2" />
    </Link>;
};
export default LogoLink;