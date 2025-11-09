
import React from 'react';
import { MEAL_TYPES, DIETARY_OPTIONS } from '../constants';

interface RecipeOptionsProps {
  mealType: string;
  setMealType: (value: string) => void;
  dietaryRestrictions: string;
  setDietaryRestrictions: (value: string) => void;
}

export const RecipeOptions: React.FC<RecipeOptionsProps> = ({
  mealType,
  setMealType,
  dietaryRestrictions,
  setDietaryRestrictions
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="meal-type" className="block text-lg font-semibold text-gray-700">Meal Type</label>
        <select
          id="meal-type"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          {MEAL_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="dietary-restrictions" className="block text-lg font-semibold text-gray-700">Dietary Restrictions</label>
        <select
          id="dietary-restrictions"
          value={dietaryRestrictions}
          onChange={(e) => setDietaryRestrictions(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          {DIETARY_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
