
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useJobsData } from "../hooks/useJobsData";
import { useMockJobsData } from "../hooks/useMockJobsData";
import { useMockData } from "@/utils/mockData";
import JobRow from "./JobRow";
import LoadingSpinner from "./LoadingSpinner";
import EmptyJobsState from "./EmptyJobsState";

const JobsTable: React.FC = () => {
  const showMockData = useMockData();
  const { data: realJobs = [], isLoading: realLoading, error: realError } = useJobsData();
  const { data: mockJobs = [], isLoading: mockLoading } = useMockJobsData();
  
  const jobs = showMockData ? mockJobs : realJobs;
  const isLoading = showMockData ? mockLoading : realLoading;
  const error = showMockData ? null : realError;

  const handleViewJob = (jobId: string) => {
    console.log("View job:", jobId);
    // Add view job functionality here
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error && !showMockData) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading jobs: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Trade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Current Step</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length === 0 ? (
            <EmptyJobsState />
          ) : (
            jobs.map((job) => (
              <JobRow key={job.id} job={job} onViewJob={handleViewJob} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;
