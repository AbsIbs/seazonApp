import { getFirestore, collection, getDoc, getDocs, where, orderBy, limit, query, orderBy, limit, startAfter } from "firebase/firestore/lite";

const db = getFirestore();
const commentsRef = collection(db, 'comments');

// A function to retrieve the user info per comments and store it 
const retrieveUserInfo = async (commentsArray) => {
  const newArray = [...commentsArray]
  try {
    for (const comments of newArray) {
      const userRef = collection(db, 'users', comments.userID);
      const docSnap = await getDoc(userRef);
      const tempData = docSnap.data();
      comments.author = tempData.displayName;
      comments.profileImageURL = tempData.profileImageURL;
    }
    return newArray;
  } catch (error) {
    throw new console.error('error occured when loading user-related information for comments');
  }
};

// Get Comments for feed
const getComments = async (props) => {
  const lastPostID = props.lastPostID;
  const recipeID = props.recipeID
  try {
    // If there is a last post that we are passing, then retrieve the next 5 comments after it
    if (lastPostID) {
      // Retrieve the document of the last post
      const lastSnapShotRef = doc(db, 'comments', lastPostID)
      const lastPostSnapshot = await getDoc(lastSnapShotRef)
      // Retrieve our comments after that
      const q = query(
        commentsRef,
        orderBy('timestamp', 'desc'),
        where('recipeID', '==', recipeID),
        startAfter(lastPostSnapshot),
        limit(5)
      );
      const commentsSnapshot = await getDocs(q)
      const rawComments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const comments = retrieveUserInfo(rawComments)
      return comments;
    } else {
      // If there is no last post then retrieve the first 3 comments
      const q = query(
        commentsRef,
        orderBy('timestamp', 'desc'),
        where('recipeID', '==', recipeID),
        limit(3)
      );
      const commentsSnapshot = await getDocs(q)
      const rawComments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const comments = retrieveUserInfo(rawComments)
      return comments;
    }
  } catch (error) {
    throw new console.error('internal', 'An error occurred while fetching more comments.');;
  }
};

// Editing Comments
export const updateRecipe = async (props) => {
  const commentID = props.commentsID
  const data = props.data
  const docRef = doc(db, 'comments', commentID)
  return updateDoc(docRef, data)
};

// Delete Comments
export const deleteRecipe = async (props) => {
  const commentsID = props.commentsID
  const docRef = doc(db, 'comments', commentID)
  return deleteDoc(docRef)
};