
import { Json } from "@/integrations/supabase/types";

export interface Step {
  id: number;
  name: string;
  description?: string;
  estimatedTime?: string;
  required: boolean;
}

export type WorkflowStatus = 'active' | 'archived' | 'draft';

export interface Workflow {
  id: string;
  name: string;
  description: string | null;
  steps: Step[];
  trade: string;
  active_jobs: number;
  workflow_number?: string;
  status?: WorkflowStatus;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  color?: string;
}

export const TRADE_CATEGORIES = ["Wood Finishing", "Auto Body", "Interior Paint", "Exterior Paint"];
export const TRADE_KEYS = ["wood", "auto", "interior", "exterior"];

export const STATUS_COLORS = {
  active: "bg-green-100 text-green-800 border-green-300",
  archived: "bg-gray-100 text-gray-800 border-gray-300",
  draft: "bg-blue-100 text-blue-800 border-blue-300",
};

export const TRADE_COLORS = {
  "Wood Finishing": "border-amber-200",
  "Auto Body": "border-blue-200",
  "Interior Paint": "border-purple-200",
  "Exterior Paint": "border-emerald-200",
};

export const getTradeFilter = (trade: string): string => {
  switch(trade) {
    case "wood":
      return "Wood Finishing";
    case "auto":
      return "Auto Body";
    case "interior":
      return "Interior Paint";
    case "exterior":
      return "Exterior Paint";
    default:
      return "";
  }
};

export const generateWorkflowNumber = (): string => {
  return `WF-${Math.floor(Math.random() * 10000)}`;
};
