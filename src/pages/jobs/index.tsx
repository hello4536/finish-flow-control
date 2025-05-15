
import React from "react";
import JobsHeader from "./components/JobsHeader";
import JobsStats from "./components/JobsStats";
import JobsList from "./components/JobsList";

const Jobs: React.FC = () => {
  return (
    <div className="space-y-6">
      <JobsHeader />
      <JobsStats />
      <JobsList />
    </div>
  );
};

export default Jobs;
