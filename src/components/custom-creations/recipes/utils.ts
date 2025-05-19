
import { RecipeFormValues } from "./schema";

export const calculateTotalVolume = (ingredients: RecipeFormValues['ingredients']) => {
  let total = 0;
  let commonUnit = '';
  
  // Find the most common unit
  const unitCounts: Record<string, number> = {};
  ingredients.forEach(ingredient => {
    if (ingredient.unit) {
      unitCounts[ingredient.unit] = (unitCounts[ingredient.unit] || 0) + 1;
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
  ingredients.forEach(ingredient => {
    if (ingredient.unit === commonUnit && ingredient.amount) {
      const qty = parseFloat(ingredient.amount);
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
