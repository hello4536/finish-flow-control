
import React from "react";
import { Badge } from "@/components/ui/badge";

interface JobStatusProps {
  status: string;
}

const JobStatus: React.FC<JobStatusProps> = ({ status }) => {
  switch (status) {
    case "in_progress":
      return <Badge className="bg-amber-500 whitespace-nowrap px-3">In Progress</Badge>;
    case "complete":
      return <Badge className="bg-green-500">Complete</Badge>;
    case "on_hold":
      return <Badge variant="outline" className="bg-red-500 text-white">On Hold</Badge>;
    case "upcoming":
      return <Badge variant="outline">Upcoming</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default JobStatus;
