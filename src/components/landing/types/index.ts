
import { FeatureTab } from "./FeatureTab";
import { coreFeatures } from "./data/coreFeatures";
import { inventoryFeatures } from "./data/inventoryFeatures";
import { qualityFeatures } from "./data/qualityFeatures";
import { customFeatures } from "./data/customFeatures";
import { resourceFeatures } from "./data/resourceFeatures";

export { type FeatureTab } from "./FeatureTab";

export const featureTabs: FeatureTab[] = [
  ...coreFeatures,
  ...inventoryFeatures,
  ...qualityFeatures,
  ...customFeatures,
  ...resourceFeatures
];
