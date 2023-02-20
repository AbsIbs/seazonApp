import React, { useState, createContext } from "react";
import uuid from 'react-native-uuid'

const AddRecipeContext = createContext();

const AddRecipeProvider = ({ children }) => {

  const [recipe, setRecipe] = useState({
    title: null,
    chefsNotes: null,
    prepTime: null,
    cookingTime: null,
    servings: null,
    coverImage: null,
    difficulty: null,
    mealType: null,
    dietary: [],
    tags: [],
    ingredients: [],
    steps: null,
    macros: {
      calories: null,
      carbs: null,
      protein: null,
      fat: null
    }
  });

  return (
    <AddRecipeContext.Provider
      value={{ recipe, setRecipe }}>
      {children}
    </AddRecipeContext.Provider>
  )
};

export { AddRecipeContext, AddRecipeProvider };