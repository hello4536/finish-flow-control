
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useJobsData } from '../hooks/useJobsData';
import JobsTable from './JobsTable';
import EmptyJobsState from './EmptyJobsState';

const JobsList: React.FC = () => {
  const { data: jobs = [], isLoading } = useJobsData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Active Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.length > 0 ? (
          <JobsTable jobs={jobs} isLoading={isLoading} />
        ) : (
          <EmptyJobsState />
        )}
      </CardContent>
    </Card>
  );
};

export default JobsList;
