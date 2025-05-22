import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import JobRow from "./JobRow";
import EmptyJobsState from "./EmptyJobsState";
import LoadingSpinner from "./LoadingSpinner";
import { useJobsData } from "../hooks/useJobsData";
const JobsTable: React.FC = () => {
  const {
    toast
  } = useToast();
  const {
    jobs,
    isLoading
  } = useJobsData();
  const handleViewJob = (jobId: string, jobName: string) => {
    toast({
      title: `Viewing Job: ${jobId}`,
      description: `Details for ${jobName} will be displayed soon.`
    });
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Job ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Current Step</TableHead>
            <TableHead>Trade</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length > 0 ? jobs.map(job => <JobRow key={job.id} job={job} onViewJob={handleViewJob} />) : <EmptyJobsState />}
        </TableBody>
      </Table>
    </div>;
};
export default JobsTable;