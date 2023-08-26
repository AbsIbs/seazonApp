import { getFirestore, collection, deleteDoc, updateDoc, doc, getDoc, getDocs, limit, query, orderBy, startAfter } from "firebase/firestore/lite";

const db = getFirestore();
const recipesRef = collection(db, 'recipes');

// A function to retrieve the user info per recipe and store it 
const retrieveUserInfo = async (recipesArray) => {
  const newArray = [...recipesArray]
  try {
    for (const recipe of newArray) {
      const userRef = doc(db, 'users', recipe.userID);
      const docSnap = await getDoc(userRef);
      const tempData = docSnap.data();
      recipe.author = tempData.displayName;
      recipe.profileImageURL = tempData.profileImageURL;
    }
    return newArray;
  } catch (error) {
    throw new console.error('error occured when loading user-related information for recipes', error);
  }
};

// A function to retrieve the number of comments for the recipe
const getNumberOfComments = async (recipeID) => {
  const commentsRef = collection(db, 'comments')
  const q = query(
    commentsRef,
    where('recipeID', '==', recipeID)
  );
  const commentsSnapshot = await getDocs(q)
  const size = commentsSnapshot.size()
  return size
};

// Get invididual recipes
export const getRecipe = async (props) => {
  const recipeID = props.recipeID
  const recipeRef = collection(db, 'recipes', recipeID);
  try {
    const snapshot = await getDoc(recipeRef)
    const recipe = snapshot.data()
    const size = getNumberOfComments(props.recipeID)
    recipe['numComments'] = size
    return recipe
  } catch (error) {
    throw new console.error('error occured when loading recipe', error);
  }
};

// Get Recipes for feed
export const getRecipes = async (props) => {
  const lastPostID = props.lastPostID;
  try {
    // If there is a last post that we are passing, then retrieve the next 5 recipe after it
    if (lastPostID) {
      // Retrieve the document of the last post
      const lastSnapShotRef = doc(db, 'recipes', lastPostID)
      const lastPostSnapshot = await getDoc(lastSnapShotRef)
      // Retrieve our recipes after that
      const q = query(recipesRef, orderBy('timestamp', 'desc'), startAfter(lastPostSnapshot), limit(5));
      const recipesSnapshot = await getDocs(q)
      const rawRecipes = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const recipes = await retrieveUserInfo(rawRecipes)
      return recipes;
    } else {
      // If there is no last post then retrieve the first 5 initial recipe
      const q = query(recipesRef, orderBy('timestamp', 'desc'), limit(1));
      const recipesSnapshot = await getDocs(q)
      const rawRecipes = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const recipes = await retrieveUserInfo(rawRecipes)
      return recipes;
    }
  } catch (error) {
    throw new console.error('INTERNAL', 'An error occurred while fetching more comments.');
  }
};

// Editing Recipe
export const updateRecipe = async (props) => {
  const recipeID = props.recipeID
  const data = props.data
  const docRef = doc(db, 'recipes', recipeID)
  return updateDoc(docRef, data)
};

// Delete Recipe
export const deleteRecipe = async (props) => {
  const recipeID = props.recipeID
  const docRef = doc(db, 'recipes', recipeID)
  return deleteDoc(docRef)
};