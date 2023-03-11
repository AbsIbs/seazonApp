import React, { useState, createContext } from "react";

const AddRecipeContext = createContext();

const AddRecipeProvider = ({ children }) => {

  const [recipe, setRecipe] = useState({
    title: null,
    chefsNotes: null,
    prepTime: null,
    cookingTime: null,
    servings: null,
    coverImage: null,
    youtubeURL: '',
    difficulty: null,
    mealType: null,
    dietary: [],
    tags: [],
    tempAlternatives: [],
    ingredients: [],
    steps: [],
    macros: {
      calories: null,
      carbs: null,
      protein: null,
      fat: null
    }
  });

  const [errorRecipe, setErrorRecipe] = useState({
    title: false,
    chefsNotes: false,
    prepTime: false,
    cookingTime: false,
    servings: false,
    coverImage: false,
    difficulty: false,
    mealType: false,
    dietary: false,
    ingredients: false,
    steps: false,
  })

  const [tempAlternativeIngredient, setTempAlternativeIngredient] = useState([])

  return (
    <AddRecipeContext.Provider
      value={{ recipe, setRecipe, errorRecipe, setErrorRecipe, tempAlternativeIngredient, setTempAlternativeIngredient }}>
      {children}
    </AddRecipeContext.Provider>
  )
};

export { AddRecipeContext, AddRecipeProvider };