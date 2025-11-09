import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

// FIX: Per coding guidelines, initialize GoogleGenAI with API_KEY from environment variables directly and assume it is set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "A creative and appealing name for the recipe."
        },
        description: {
            type: Type.STRING,
            description: "A short, one or two sentence summary of the dish."
        },
        prepTime: {
            type: Type.STRING,
            description: "Estimated preparation time, e.g., '15 minutes'."
        },
        cookTime: {
            type: Type.STRING,
            description: "Estimated cooking time, e.g., '30 minutes'."
        },
        servings: {
            type: Type.STRING,
            description: "Number of servings the recipe makes, e.g., '4 servings'."
        },
        ingredients: {
            type: Type.ARRAY,
            description: "A list of all necessary ingredients with quantities.",
            items: {
                type: Type.STRING
            }
        },
        instructions: {
            type: Type.ARRAY,
            description: "Step-by-step instructions for preparing the dish.",
            items: {
                type: Type.STRING
            }
        },
    },
    required: ["title", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"]
};

export async function generateRecipe(ingredients: string[], mealType: string, dietaryRestrictions: string): Promise<Recipe> {
    const model = "gemini-2.5-flash";
    const prompt = `
    You are a creative and experienced chef. Your task is to generate a delicious recipe based on the following user-provided criteria.

    Criteria:
    - Main Ingredients Available: ${ingredients.join(', ')}
    - Desired Meal Type: ${mealType}
    - Dietary Restrictions: ${dietaryRestrictions}

    Please create a complete recipe that primarily uses the available ingredients but feel free to add common pantry staples (like oil, salt, pepper, spices) if necessary. The recipe should be easy to follow for a home cook.

    Provide a response in the specified JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
                temperature: 0.8,
                topP: 0.9,
            },
        });
        
        const recipeJsonString = response.text.trim();
        const recipeObject = JSON.parse(recipeJsonString);
        
        // Basic validation
        if (!recipeObject.title || !recipeObject.ingredients || !recipeObject.instructions) {
            throw new Error("Received incomplete recipe data from API.");
        }

        return recipeObject as Recipe;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Could not generate recipe. The AI model might be busy or an error occurred.");
    }
}