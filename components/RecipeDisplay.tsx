import React from 'react';
import type { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
}

// FIX: Changed icon type from JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const InfoCard: React.FC<{ title: string; value: string; icon: React.ReactElement }> = ({ title, value, icon }) => (
    <div className="flex flex-col items-center text-center p-4 bg-brand-light rounded-lg">
        <div className="text-brand-dark mb-2">{icon}</div>
        <p className="font-semibold text-gray-700">{title}</p>
        <p className="text-gray-600">{value}</p>
    </div>
);


export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">{recipe.title}</h2>
      <p className="text-center text-gray-600 mb-6">{recipe.description}</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <InfoCard title="Prep Time" value={recipe.prepTime} icon={
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        } />
        <InfoCard title="Cook Time" value={recipe.cookTime} icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0112 3c1.398 0 2.743.57 3.657 1.528C18.5 6.5 19 9 19 12c2 1 2.969 2.343 2.969 2.343a8 8 0 01-4.312 4.314z" /></svg>
        } />
         <InfoCard title="Servings" value={recipe.servings} icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        } />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-brand-primary pb-2">Ingredients</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
        <div className="md:col-span-3">
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-brand-primary pb-2">Instructions</h3>
            <ol className="space-y-4 text-gray-700">
                {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex items-start">
                        <span className="mr-3 flex-shrink-0 bg-brand-primary text-white rounded-full h-6 w-6 text-sm flex items-center justify-center font-bold">{index + 1}</span>
                        <span>{step}</span>
                    </li>
                ))}
            </ol>
        </div>
      </div>
    </div>
  );
};