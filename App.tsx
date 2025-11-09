
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { IngredientManager } from './components/IngredientManager';
import { RecipeOptions } from './components/RecipeOptions';
import { RecipeDisplay } from './components/RecipeDisplay';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';
import type { Recipe } from './types';
import { generateRecipe } from './services/geminiService';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['Tomatoes', 'Onion', 'Garlic']);
  const [mealType, setMealType] = useState<string>('Dinner');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>('None');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedRecipe(null);

    try {
      const recipe = await generateRecipe(ingredients, mealType, dietaryRestrictions);
      setGeneratedRecipe(recipe);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate recipe. Please try again. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, mealType, dietaryRestrictions]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Your Personal AI Chef</h2>
              <p className="mt-2 text-gray-600">Enter your ingredients and preferences, and let AI create a unique recipe for you!</p>
            </div>
            
            <IngredientManager ingredients={ingredients} setIngredients={setIngredients} />
            <RecipeOptions
              mealType={mealType}
              setMealType={setMealType}
              dietaryRestrictions={dietaryRestrictions}
              setDietaryRestrictions={setDietaryRestrictions}
            />

            <div className="text-center">
              <button
                onClick={handleGenerateRecipe}
                disabled={isLoading}
                className="w-full md:w-auto bg-brand-primary hover:bg-brand-secondary disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
              >
                {isLoading ? 'Crafting Your Recipe...' : 'Generate Recipe'}
              </button>
            </div>
          </div>

          <div className="mt-12">
            {isLoading && <Loader />}
            {error && <ErrorDisplay message={error} />}
            {generatedRecipe && <RecipeDisplay recipe={generatedRecipe} />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
