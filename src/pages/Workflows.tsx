
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Clipboard, Database, Plus } from "lucide-react";

const WorkflowCard: React.FC<{
  name: string;
  description: string;
  steps: number;
  trade: string;
  activeJobs: number;
}> = ({ name, description, steps, trade, activeJobs }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className="card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge className="mr-2">{trade}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Clipboard className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{steps} steps</span>
            </div>
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{activeJobs} active jobs</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="gap-1"
          >
            {expanded ? (
              <>
                Hide Details <ChevronDown className="h-4 w-4" />
              </>
            ) : (
              <>
                Show Details <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 border-t pt-4">
            <h4 className="font-medium mb-2">Workflow Steps</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  1
                </div>
                <div className="ml-2">Sand</div>
              </div>
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  2
                </div>
                <div className="ml-2">Stain</div>
              </div>
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  3
                </div>
                <div className="ml-2">Seal</div>
              </div>
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  4
                </div>
                <div className="ml-2">Dry</div>
              </div>
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  5
                </div>
                <div className="ml-2">QC</div>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button size="sm">
                Duplicate
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const workflowsByTrade = {
  wood: [
    {
      name: "Standard Wood Finish",
      description: "Our standard finishing process for wooden furniture",
      steps: 5,
      trade: "Wood Finishing",
      activeJobs: 12,
    },
    {
      name: "Antique Restoration",
      description: "Specialized workflow for antique wood restoration",
      steps: 7,
      trade: "Wood Finishing",
      activeJobs: 3,
    },
    {
      name: "Clear Coat Protection",
      description: "Simple clear coat application for wooden surfaces",
      steps: 3,
      trade: "Wood Finishing",
      activeJobs: 5,
    },
  ],
  auto: [
    {
      name: "Complete Auto Repaint",
      description: "Full vehicle repaint process from prep to finish",
      steps: 8,
      trade: "Auto Body",
      activeJobs: 4,
    },
    {
      name: "Panel Repair & Refinish",
      description: "Process for repairing and refinishing individual auto panels",
      steps: 6,
      trade: "Auto Body",
      activeJobs: 2,
    },
  ],
  interior: [
    {
      name: "Interior Wall Paint",
      description: "Standard process for interior wall painting",
      steps: 4,
      trade: "Interior Paint",
      activeJobs: 7,
    },
    {
      name: "Cabinet Paint",
      description: "Specialized workflow for interior cabinet painting",
      steps: 6,
      trade: "Interior Paint",
      activeJobs: 3,
    },
  ],
  exterior: [
    {
      name: "Exterior House Paint",
      description: "Complete workflow for exterior house painting",
      steps: 5,
      trade: "Exterior Paint",
      activeJobs: 2,
    },
    {
      name: "Deck Refinishing",
      description: "Process for refinishing outdoor deck surfaces",
      steps: 6,
      trade: "Exterior Paint",
      activeJobs: 1,
    },
  ],
};

const Workflows: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Workflows</h2>
        <div className="mt-2 flex items-center space-x-2 sm:mt-0">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Workflow
          </Button>
        </div>
      </div>

      <Tabs defaultValue="wood">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="wood">Wood Finishing</TabsTrigger>
            <TabsTrigger value="auto">Auto Body</TabsTrigger>
            <TabsTrigger value="interior">Interior Paint</TabsTrigger>
            <TabsTrigger value="exterior">Exterior Paint</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Import
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="wood" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflowsByTrade.wood.map((workflow, index) => (
              <WorkflowCard key={index} {...workflow} />
            ))}
            <Card className="flex flex-col items-center justify-center card-hover border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg font-medium">Add Wood Finishing Workflow</p>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Create a new workflow template for your wood finishing processes
                </p>
                <Button className="mt-4">Create Workflow</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="auto" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflowsByTrade.auto.map((workflow, index) => (
              <WorkflowCard key={index} {...workflow} />
            ))}
            <Card className="flex flex-col items-center justify-center card-hover border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg font-medium">Add Auto Body Workflow</p>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Create a new workflow template for your auto body processes
                </p>
                <Button className="mt-4">Create Workflow</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interior" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflowsByTrade.interior.map((workflow, index) => (
              <WorkflowCard key={index} {...workflow} />
            ))}
            <Card className="flex flex-col items-center justify-center card-hover border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg font-medium">Add Interior Paint Workflow</p>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Create a new workflow template for your interior painting processes
                </p>
                <Button className="mt-4">Create Workflow</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exterior" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflowsByTrade.exterior.map((workflow, index) => (
              <WorkflowCard key={index} {...workflow} />
            ))}
            <Card className="flex flex-col items-center justify-center card-hover border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg font-medium">Add Exterior Paint Workflow</p>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Create a new workflow template for your exterior painting processes
                </p>
                <Button className="mt-4">Create Workflow</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workflows;
