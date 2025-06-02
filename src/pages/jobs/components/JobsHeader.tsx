
import React from 'react';
import AddJobDialog from './AddJobDialog';

const JobsHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Jobs & Projects
        </h1>
        <p className="text-slate-600 mt-2 font-medium">
          Manage jobs with smart costing and profitability analytics
        </p>
      </div>
      <AddJobDialog />
    </div>
  );
};

export default JobsHeader;
