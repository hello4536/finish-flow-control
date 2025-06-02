
import React from "react";
import JobsHeader from "./jobs/components/JobsHeader";
import JobsStats from "./jobs/components/JobsStats";
import JobsList from "./jobs/components/JobsList";

const Jobs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <JobsHeader />
        <JobsStats />
        <JobsList />
      </div>
    </div>
  );
};

export default Jobs;
