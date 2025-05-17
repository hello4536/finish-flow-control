
import { Json } from "@/integrations/supabase/types";

export interface Step {
  id: number;
  name: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string | null;
  steps: Step[];
  trade: string;
  active_jobs: number;
  workflow_number?: string;
  status?: string;
}

export const TRADE_CATEGORIES = ["Wood Finishing", "Auto Body", "Interior Paint", "Exterior Paint"];
export const TRADE_KEYS = ["wood", "auto", "interior", "exterior"];

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
