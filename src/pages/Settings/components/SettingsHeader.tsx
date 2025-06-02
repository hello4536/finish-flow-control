
import React from "react";

const SettingsHeader: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Settings
      </h1>
      <p className="text-slate-600 mt-2 font-medium">
        Manage your account preferences and application settings
      </p>
    </div>
  );
};

export default SettingsHeader;
