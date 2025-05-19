
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { IngredientInput } from "../schema";

interface IngredientsTabProps {
  ingredients: IngredientInput[];
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
  onIngredientChange: (index: number, field: keyof IngredientInput, value: string) => void;
}

const IngredientsTab: React.FC<IngredientsTabProps> = ({ 
  ingredients, 
  onAddIngredient, 
  onRemoveIngredient, 
  onIngredientChange 
}) => {
  return (
    <div className="space-y-4">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 items-end">
          <div className="col-span-5">
            <FormLabel htmlFor={`ingredient-${index}`}>
              {index === 0 ? "Ingredient" : ""}
            </FormLabel>
            <Input
              id={`ingredient-${index}`}
              value={ingredient.name}
              onChange={(e) => onIngredientChange(index, "name", e.target.value)}
              placeholder="Ingredient name"
            />
          </div>
          <div className="col-span-3">
            <FormLabel htmlFor={`amount-${index}`}>
              {index === 0 ? "Amount" : ""}
            </FormLabel>
            <Input
              id={`amount-${index}`}
              value={ingredient.amount}
              onChange={(e) => onIngredientChange(index, "amount", e.target.value)}
              placeholder="Amount"
            />
          </div>
          <div className="col-span-3">
            <FormLabel htmlFor={`unit-${index}`}>
              {index === 0 ? "Unit" : ""}
            </FormLabel>
            <Input
              id={`unit-${index}`}
              value={ingredient.unit}
              onChange={(e) => onIngredientChange(index, "unit", e.target.value)}
              placeholder="Unit"
            />
          </div>
          <div className="col-span-1">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => onRemoveIngredient(index)}
              disabled={ingredients.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button 
        type="button" 
        variant="outline" 
        onClick={onAddIngredient}
        className="w-full mt-2"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Ingredient
      </Button>
    </div>
  );
};

export default IngredientsTab;
