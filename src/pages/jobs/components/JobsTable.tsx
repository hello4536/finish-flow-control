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
            <TableHead className="w-[100px] rounded-sm bg-purple-100">Job ID</TableHead>
            <TableHead className="bg-purple-100">Name</TableHead>
            <TableHead className="bg-purple-100">Current Step</TableHead>
            <TableHead className="bg-purple-100">Trade</TableHead>
            <TableHead className="bg-purple-100">Assigned To</TableHead>
            <TableHead className="bg-purple-100">Due Date</TableHead>
            <TableHead className="w-[100px] bg-purple-100">Status</TableHead>
            <TableHead className="text-right bg-purple-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length > 0 ? jobs.map(job => <JobRow key={job.id} job={job} onViewJob={handleViewJob} />) : <EmptyJobsState />}
        </TableBody>
      </Table>
    </div>;
};
export default JobsTable;