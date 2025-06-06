
import { ReactNode } from "react";

export interface FeatureTab {
  id: string;
  label: string;
  icon: ReactNode;
  screenshot: string;
  altText: string;
  description: string;
  features: string[];
}
