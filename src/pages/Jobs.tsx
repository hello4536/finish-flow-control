
import React from "react";
import JobsHeader from "./jobs/components/JobsHeader";
import JobsStats from "./jobs/components/JobsStats";
import JobsList from "./jobs/components/JobsList";

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
