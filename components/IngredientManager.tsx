
import React, { useState } from 'react';

interface IngredientManagerProps {
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

export const IngredientManager: React.FC<IngredientManagerProps> = ({ ingredients, setIngredients }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAddIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div className="space-y-4">
      <label htmlFor="ingredient-input" className="block text-lg font-semibold text-gray-700">Your Ingredients</label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="ingredient-input"
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Chicken Breast"
          className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary bg-gray-50 text-gray-900 placeholder-gray-500"
        />
        <button
          onClick={handleAddIngredient}
          className="w-full sm:w-auto bg-brand-light text-brand-dark font-semibold px-6 py-2 rounded-lg hover:bg-green-200 transition-colors"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        {ingredients.map((ingredient) => (
          <span
            key={ingredient}
            className="flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium"
          >
            {ingredient}
            <button
              onClick={() => handleRemoveIngredient(ingredient)}
              className="ml-2 text-gray-500 hover:text-gray-800"
              aria-label={`Remove ${ingredient}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
