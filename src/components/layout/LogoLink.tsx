
import React from "react";
import { Link } from "react-router-dom";

const LogoLink: React.FC = () => {
  return (
    <Link to="/dashboard" className="flex items-center">
      <h1 className="text-xl font-bold text-blue-900">
        Fini<span className="text-accent">v</span>i
      </h1>
    </Link>
  );
};

export default LogoLink;
