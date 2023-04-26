import React, { useState, createContext } from "react";
import { Auth, getAuth } from "firebase/auth";

const AddRecipeContext = createContext();

const AddRecipeProvider = ({ children }) => {

  const auth = getAuth();
  const user = auth.currentUser;
  const [recipe, setRecipe] = useState({
    author: user.displayName,
    profileImageURL: user.photoURL,
    userID: user.uid,
    title: null,
    chefsNotes: null,
    prepTime: null,
    cookingTime: null,
    servings: null,
    coverImage: null,
    coverVideo: null,
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

  const units = {
    'imperial': ['cup', 'gal', 'lb', 'units', 'tsp', 'Tbsp'],
    'metric': ['ml', 'l', 'g', 'units', 'tsp', 'Tbsp']
  };

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
      value={{ recipe, setRecipe, errorRecipe, setErrorRecipe, tempAlternativeIngredient, setTempAlternativeIngredient, units }}>
      {children}
    </AddRecipeContext.Provider>
  )
};

export { AddRecipeContext, AddRecipeProvider };