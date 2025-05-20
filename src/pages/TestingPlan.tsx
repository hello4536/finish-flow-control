
import React from 'react';
import { TestingUtils } from '@/utils/TestingUtils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileCheck, Settings } from 'lucide-react';

const TestingPlan: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testing Plan</h1>
          <p className="text-muted-foreground">
            Validate functionality across all features and pages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href="/?devMode=true" target="_blank" rel="noopener noreferrer">
              <Settings className="mr-2 h-4 w-4" />
              Enable Dev Mode
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Testing Instructions</h2>
          </div>
          
          <div className="mb-4">
            <p className="mb-2">
              This testing plan helps verify all functionality across the Finivi application. 
              Follow these steps to ensure comprehensive testing:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2 mt-4">
              <li>
                <strong>Enable Developer Mode</strong> - Click the "Enable Dev Mode" button above 
                to access testing features and sample data generation.
              </li>
              <li>
                <strong>Use Test Cases</strong> - Work through each test case, marking them as passed or failed.
              </li>
              <li>
                <strong>Add Sample Data</strong> - Many pages have "Add Sample Data" buttons to populate 
                the application with test data.
              </li>
              <li>
                <strong>Test Authentication Flows</strong> - For testing user authentication, you can create test accounts.
              </li>
              <li>
                <strong>Document Issues</strong> - Note any issues or unexpected behavior in the test results.
              </li>
            </ol>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-md font-medium text-blue-800 mb-2">Testing Tips</h3>
            <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
              <li>Test each feature with both valid and invalid inputs</li>
              <li>Verify error messages display correctly</li>
              <li>Check responsive behavior on different screen sizes</li>
              <li>Test navigation between pages and sections</li>
              <li>Verify all data is saved and retrieved correctly</li>
            </ul>
          </div>
        </div>

        <TestingUtils />
      </div>
    </div>
  );
};

export default TestingPlan;
