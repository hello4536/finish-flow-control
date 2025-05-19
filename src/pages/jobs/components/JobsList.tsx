
import React from "react";
import { useDevMode } from "@/context/DevModeContext";
import JobsTable from "./JobsTable";

const JobsList: React.FC = () => {
  const { isDevMode } = useDevMode();
  
  return (
    <div className="space-y-4">
      <JobsTable />
    </div>
  );
};

export default JobsList;
