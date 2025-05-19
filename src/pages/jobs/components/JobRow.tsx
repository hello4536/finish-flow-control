
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import JobStatus from "./JobStatus";
import { format } from "date-fns";

interface JobRowProps {
  job: {
    id: string;
    job_number: string;
    name: string;
    current_step: string | null;
    trade: string;
    assigned_to: string | null;
    due_date: string | null;
    status: string;
  };
  onViewJob: (jobId: string, jobName: string) => void;
}

const JobRow: React.FC<JobRowProps> = ({ job, onViewJob }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <TableRow key={job.id}>
      <TableCell className="font-medium">{job.job_number}</TableCell>
      <TableCell>{job.name}</TableCell>
      <TableCell>{job.current_step || "-"}</TableCell>
      <TableCell>{job.trade}</TableCell>
      <TableCell>{job.assigned_to || "-"}</TableCell>
      <TableCell>{formatDate(job.due_date)}</TableCell>
      <TableCell>
        <JobStatus status={job.status} />
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm" onClick={() => onViewJob(job.job_number, job.name)}>View</Button>
      </TableCell>
    </TableRow>
  );
};

export default JobRow;
