
import { RecipeFormValues } from "./schema";

export const calculateTotalVolume = (materials: RecipeFormValues['materials']) => {
  let total = 0;
  let commonUnit = '';
  
  // Find the most common unit
  const unitCounts: Record<string, number> = {};
  materials.forEach(material => {
    if (material.unit) {
      unitCounts[material.unit] = (unitCounts[material.unit] || 0) + 1;
    }
  });
  
  let maxCount = 0;
  Object.entries(unitCounts).forEach(([unit, count]) => {
    if (count > maxCount) {
      maxCount = count;
      commonUnit = unit;
    }
  });
  
  // Sum quantities with the same unit
  materials.forEach(material => {
    if (material.unit === commonUnit && material.quantity) {
      const qty = parseFloat(material.quantity);
      if (!isNaN(qty)) {
        total += qty;
      }
    }
  });
  
  if (total > 0 && commonUnit) {
    return `${total} ${commonUnit}`;
  } else {
    return '';
  }
};
