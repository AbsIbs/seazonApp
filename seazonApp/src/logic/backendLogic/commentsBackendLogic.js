import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  limit,
  query,
  orderBy,
  startAfter
} from "firebase/firestore/lite";

const db = getFirestore();
const commentsRef = collection(db, 'comments');

// A function to retrieve the user info per comments and store it 
const retrieveUserInfo = async (commentsArray) => {
  const newArray = []
  try {
    for (const comment of commentsArray) {
      const userRef = doc(db, 'users', comment.userID);
      const docSnap = await getDoc(userRef);
      const tempData = docSnap.data();
      comment['author'] = tempData.displayName;
      comment['profileImageURL'] = tempData.profileImageURL;
      newArray.push(comment)
    }
    return newArray;
  } catch (error) {
    throw new console.error('error occured when loading user-related information for comments');
  }
};

// A function to retrieve the number of likes per comment
const getNumberOfLikes = async (commentArray) => {
  const newArray = [];

  try {
    for (const comment of commentArray) {
      const subCollectionRef = collection(db, 'comments', comment.id, 'likes');
      const snapshot = await getDocs(subCollectionRef);
      const likes = snapshot.size;
      comment['numLikes'] = likes;
      newArray.push(comment); // Add the modified comment to the newArray
    }
    return newArray;
  } catch (error) {
    console.error('Error in getNumberOfLikes:', error);
    throw error;
  }
};

// Get Comments for recipes
export const getComments = async (props) => {
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
      const comments = await retrieveUserInfo(rawComments)
      const commentsLikes = await getNumberOfLikes(comments)
      return commentsLikes;
    } else {
      // If there is no last post then retrieve the first 3 comments
      const q = query(
        commentsRef,
        orderBy('timestamp', 'desc'),
        where('recipeID', '==', recipeID),
        limit(3)
      );
      console.log('started')
      const commentsSnapshot = await getDocs(q)
      console.log(commentsSnapshot)
      if (commentsSnapshot.size > 0) {
        const rawComments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const comments = await retrieveUserInfo(rawComments)
        console.log('normal comments work')
        const commentsLikes = await getNumberOfLikes(comments)
        console.log('commentsLikes worked')
        console.log(commentsLikes[0]['numLikes'])
        return commentsLikes;
      }
    }
  } catch (error) {
    throw new console.error('internal', 'An error occurred while fetching more comments.');;
  }
};

// Editing Comments
export const updateRecipe = async (props) => {
  const data = props.data
  const docRef = doc(db, 'comments', data.commentID)
  return updateDoc(docRef, data)
};

// Delete Comments
export const deleteRecipe = async (props) => {
  const commentID = props.commentsID
  const docRef = doc(db, 'comments', commentID)
  return deleteDoc(docRef)
};