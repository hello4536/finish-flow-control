
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Check, X, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDevMode } from "@/context/DevModeContext";

export interface TestCase {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: string[];
  expectedResult: string;
}

interface TestResult {
  testCaseId: string;
  status: "passed" | "failed" | "pending";
  notes: string;
}

export const TestingUtils: React.FC = () => {
  const { isDevMode } = useDevMode();
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Sample test cases based on our comprehensive testing plan
  const testCases: TestCase[] = [
    // Public Pages
    {
      id: "pub-001",
      name: "Home Page Rendering",
      description: "Verify that the home page renders correctly with all sections",
      category: "public-pages",
      steps: [
        "Navigate to the home page ('/')",
        "Verify header, hero section, features, and footer are displayed",
        "Check that all images load properly",
        "Verify responsive layout on different screen sizes"
      ],
      expectedResult: "All sections of the home page should be visible and properly formatted"
    },
    {
      id: "pub-002",
      name: "Woodworking Finishing Page",
      description: "Test functionality of the woodworking finishing page",
      category: "public-pages",
      steps: [
        "Navigate to Woodworking Finishing page",
        "Test category tab functionality",
        "Click on various article cards",
        "Verify article dialog opens and displays content",
        "Test newsletter form functionality"
      ],
      expectedResult: "Woodworking page should display properly with working tabs, articles, and form"
    },
    {
      id: "pub-003",
      name: "Auto Body Finishing Page",
      description: "Test functionality of the auto body finishing page",
      category: "public-pages",
      steps: [
        "Navigate to Auto Body Finishing page",
        "Test category tab functionality",
        "Click on various article cards",
        "Verify article dialog opens and displays content"
      ],
      expectedResult: "Auto body page should display properly with working tabs, articles, and dialog"
    },
    
    // Authentication
    {
      id: "auth-001",
      name: "User Registration",
      description: "Test user registration process",
      category: "authentication",
      steps: [
        "Click 'Sign Up' button on home page",
        "Fill out registration form with valid data",
        "Submit the form",
        "Check for success notification",
        "Verify redirect to appropriate page"
      ],
      expectedResult: "User should be registered and redirected to dashboard"
    },
    {
      id: "auth-002",
      name: "User Login",
      description: "Test user login functionality",
      category: "authentication",
      steps: [
        "Click 'Sign In' button on home page",
        "Enter valid credentials",
        "Submit the login form",
        "Verify redirect to dashboard",
        "Check that user information is displayed correctly"
      ],
      expectedResult: "User should be logged in and redirected to dashboard"
    },
    {
      id: "auth-003",
      name: "Access Control",
      description: "Verify protected routes require authentication",
      category: "authentication",
      steps: [
        "Log out if currently logged in",
        "Attempt to navigate to '/dashboard'",
        "Verify redirect to login page",
        "Log in with valid credentials",
        "Attempt to navigate to '/dashboard' again"
      ],
      expectedResult: "Unauthenticated user should be redirected to login; authenticated user should access dashboard"
    },
    
    // Dashboard
    {
      id: "dash-001",
      name: "Dashboard Components",
      description: "Verify all dashboard components load correctly",
      category: "dashboard",
      steps: [
        "Log in to the application",
        "Navigate to dashboard",
        "Check that statistics cards display",
        "Verify activity feed loads",
        "Check employee tasks section",
        "Verify due today section loads",
        "Check material usage charts"
      ],
      expectedResult: "All dashboard components should load and display appropriate data"
    },
    
    // Jobs Management
    {
      id: "jobs-001",
      name: "Jobs List View",
      description: "Test functionality of the jobs list page",
      category: "jobs",
      steps: [
        "Navigate to Jobs page",
        "Verify jobs are listed in a table",
        "Test search functionality",
        "Test filtering options",
        "Click 'View' on a job to check details"
      ],
      expectedResult: "Jobs list should display properly with working search, filter, and detail view"
    },
    
    // Tasks
    {
      id: "tasks-001",
      name: "Task Creation",
      description: "Test creating a new daily task",
      category: "tasks",
      steps: [
        "Navigate to Daily Tasks page",
        "Fill out task creation form",
        "Submit the form",
        "Verify task appears in the list",
        "Check that task details are correct"
      ],
      expectedResult: "New task should be created and displayed in the tasks list"
    },
    
    // Materials & Inventory
    {
      id: "inv-001",
      name: "Inventory Management",
      description: "Test inventory list and operations",
      category: "inventory",
      steps: [
        "Navigate to Inventory page",
        "Verify inventory items are listed",
        "Test search and filter functionality",
        "Click 'Add New' to test item creation",
        "Test editing an existing item",
        "Test deleting an item"
      ],
      expectedResult: "Inventory management features should work properly"
    },
    
    // Custom Creations
    {
      id: "create-001",
      name: "Custom Paint Color",
      description: "Test creating a custom paint color",
      category: "custom-creations",
      steps: [
        "Navigate to Custom Creations page",
        "Go to Paint Colors tab",
        "Click to add a new paint color",
        "Fill out all form fields across tabs",
        "Save the paint color",
        "Verify it appears in the list"
      ],
      expectedResult: "New custom paint color should be created and displayed"
    }
  ];
  
  const filteredTestCases = activeCategory === "all"
    ? testCases
    : testCases.filter(test => test.category === activeCategory);
  
  const categories = [
    { id: "all", name: "All Tests" },
    { id: "public-pages", name: "Public Pages" },
    { id: "authentication", name: "Authentication" },
    { id: "dashboard", name: "Dashboard" },
    { id: "jobs", name: "Jobs Management" },
    { id: "tasks", name: "Daily Tasks" },
    { id: "inventory", name: "Inventory" },
    { id: "custom-creations", name: "Custom Creations" }
  ];
  
  const handleMarkTest = (testId: string, status: "passed" | "failed" | "pending", notes: string = "") => {
    setTestResults(prev => ({
      ...prev,
      [testId]: {
        testCaseId: testId,
        status,
        notes
      }
    }));
  };
  
  const getResultCounts = () => {
    let passed = 0;
    let failed = 0;
    let pending = testCases.length;
    
    Object.values(testResults).forEach(result => {
      if (result.status === "passed") {
        passed++;
        pending--;
      } else if (result.status === "failed") {
        failed++;
        pending--;
      }
    });
    
    return { passed, failed, pending };
  };
  
  const counts = getResultCounts();
  
  if (!isDevMode) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Testing Utilities</CardTitle>
          <CardDescription>
            Enable Developer Mode to access the testing utilities
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" onClick={() => window.location.href = "/?devMode=true"}>
            Enable Developer Mode
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Finivi Application Testing</CardTitle>
          <CardDescription>
            Use this utility to track and document your testing progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <Badge 
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
              <div className="text-2xl font-bold text-green-700">{counts.passed}</div>
              <div className="text-sm text-green-600">Passed</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-center">
              <div className="text-2xl font-bold text-red-700">{counts.failed}</div>
              <div className="text-sm text-red-600">Failed</div>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-center">
              <div className="text-2xl font-bold text-gray-700">{counts.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ScrollArea className="h-[600px] pr-4">
        <Accordion type="single" collapsible className="w-full">
          {filteredTestCases.map(testCase => {
            const result = testResults[testCase.id];
            const status = result?.status || "pending";
            
            return (
              <AccordionItem value={testCase.id} key={testCase.id}>
                <AccordionTrigger className="py-4 px-4 hover:bg-slate-50 rounded-md">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {status === "passed" && <Check className="h-5 w-5 text-green-500 mr-2" />}
                      {status === "failed" && <X className="h-5 w-5 text-red-500 mr-2" />}
                      {status === "pending" && <AlertCircle className="h-5 w-5 text-gray-400 mr-2" />}
                      <span>{testCase.name}</span>
                    </div>
                    <Badge variant={
                      status === "passed" ? "success" : 
                      status === "failed" ? "destructive" : 
                      "outline"
                    }>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <Card>
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-4">{testCase.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">Steps:</h4>
                        <ol className="list-decimal pl-5 space-y-1">
                          {testCase.steps.map((step, index) => (
                            <li key={index} className="text-sm">{step}</li>
                          ))}
                        </ol>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">Expected Result:</h4>
                        <p className="text-sm">{testCase.expectedResult}</p>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <h4 className="text-sm font-semibold">Test Result:</h4>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant={status === "passed" ? "default" : "outline"}
                            className={status === "passed" ? "bg-green-600 hover:bg-green-700" : ""}
                            onClick={() => handleMarkTest(testCase.id, "passed")}
                          >
                            Pass
                          </Button>
                          <Button 
                            size="sm" 
                            variant={status === "failed" ? "default" : "outline"}
                            className={status === "failed" ? "bg-red-600 hover:bg-red-700" : ""}
                            onClick={() => handleMarkTest(testCase.id, "failed")}
                          >
                            Fail
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkTest(testCase.id, "pending")}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
    </div>
  );
};
