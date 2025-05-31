
import React from "react";
import { useDevMode } from "@/context/DevModeContext";
import { useMockJobsData } from "../hooks/useMockJobsData";
import { useJobsData } from "../hooks/useJobsData";
import JobsTable from "./JobsTable";
import LoadingSpinner from "./LoadingSpinner";
import EmptyJobsState from "./EmptyJobsState";

const JobsList: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { data: mockJobs, isLoading: mockLoading } = useMockJobsData();
  const { jobs: realJobs, isLoading: realLoading } = useJobsData();
  
  // Use mock data when dev mode is on, real data otherwise
  const jobs = isDevMode ? mockJobs : realJobs;
  const isLoading = isDevMode ? mockLoading : realLoading;
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!jobs || jobs.length === 0) {
    return <EmptyJobsState />;
  }
  
  return (
    <div className="space-y-4">
      <JobsTable jobs={jobs} isLoading={isLoading} />
    </div>
  );
};

export default JobsList;
