import React, { useState, useRef } from "react";
import { View, StyleSheet, TextInput, Text, Pressable, Keyboard, RefreshControl, Image, TouchableWithoutFeedback, Modal } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import uuid from 'react-native-uuid'

import { FlashList } from "@shopify/flash-list";

// Firebase Firestore
import { doc, getDoc, getDocs, addDoc, serverTimestamp, collection, query, limit, orderBy } from "firebase/firestore/lite";
import { db } from "../../../../firebase/firebase-config";
// Firebase Storage
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Firebase Auth
import { getAuth } from "firebase/auth";

import Comment from "../../../components/global/comment";
import { launchImageLibrary } from "react-native-image-picker"
import { BallIndicator } from 'react-native-indicators';
import EditAndDeleteModal from "../editAndDeleteModal";

const RecipeAddComment = (props) => {

  const recipeID = props.route.params.recipe.recipeID
  const bottomSheetRef = useRef(null)
  const confirmDeleteRef = useRef(null)

  // Create a root reference
  const storage = getStorage();

  // User details
  const auth = getAuth();
  const user = auth.currentUser

  const commentID = uuid.v4()

  // Comment to be posted
  const [comment, setComment] = useState('')
  const [imageURI, setImageURI] = useState(null)

  // Comments from database
  const [comments, setComments] = useState([])
  const [lastComment, setLastComment] = useState(null);

  // Loading screen
  const [loading, setLoading] = useState(false)

  // Comment database
  const commentsCollectionRef = collection(doc(db, "recipes", recipeID), 'comments')

  // Upload comment
  const addComment = async () => {
    setLoading(true)
    // Form the comment document to be uploaded
    const commentData = {
      commentID: commentID,
      timestamp: serverTimestamp(),
      userID: user.uid,
      comment: comment
    }

    if (imageURI != null) {
      // Upload image to Firebase
      const coverImageDirectory = `recipes/${recipeID}/comments/${commentID}/coverImage.jpg`
      const coverImageStorageRef = ref(storage, coverImageDirectory)
      const response = await fetch(imageURI.uri)
      const blob = await response.blob()
      const metadata = {
        contentType: 'image/jpeg'
      }
      await uploadBytes(coverImageStorageRef, blob, 'data_url', metadata)
      // Wait for the upload to complete and download the URL
      const coverImageURL = await getDownloadURL(ref(storage, `recipes/${recipeID}/comments/${commentID}/coverImage.jpg`));
      commentData['coverImageURL'] = coverImageURL
    }

    // Upload doc
    await addDoc(commentsCollectionRef, commentData)

    // Refresh comments
    refreshComments()
    setImageURI(null)
    setLoading(false)
  }

  // Attach image as base64 format
  const imageUploadHandler = () => {
    const options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: false
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        null
      } else {
        /* Save the image */
        setImageURI({ uri: response.assets[0].uri })
      }
    });
  };

  // Refresh control
  const [refreshing, setRefreshing] = useState(false);

  // On refresh comments
  const refreshComments = async () => {
    setRefreshing(true);
    /* Retrieve comments */
    const q = query(commentsCollectionRef, orderBy('timestamp', 'desc'), limit(5))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    /* Retrieve User details */
    for (let i = 0; i < data.length; i++) {
      const targetRecipe = data[i]
      const docRef = doc(db, 'users', targetRecipe.userID)
      const docSnap = await getDoc(docRef)
      const tempData = docSnap.data();
      targetRecipe.author = tempData.displayName
      targetRecipe.profileImageURL = tempData.profileImageURL
    }
    setComments(data);
    if (querySnapshot.docs.length > 0) {
      setLastComment(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } else {
      setLastComment(null);
    }
    setRefreshing(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer} >
        {/* Render Comments */}
        <FlashList
          data={comments}
          estimatedItemSize={500}
          /* onEndReached={() => getMoreComments()} */
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshComments()} />
          }
          renderItem={({ item, index }) => {
            return (
              <Comment
                index={index}
                recipeID={recipeID}
                timestamp={item.timestamp}
                userID={item.userID}
                author={item.author}
                profileImageURL={item.profileImageURL}
                commentID={item.commentID}
                comment={item.comment}
                imageURL={item.imageURI} />
            )
          }}
        />
      </View>
      {/* Bottom section with add comment component */}
      <View style={styles.bottomContainer} >
        {imageURI != null ?
          <TouchableWithoutFeedback onPress={() => bottomSheetRef.current?.snapTo(1)} >
            <Image
              source={imageURI}
              borderRadius={8}
              style={styles.image}
            />
          </TouchableWithoutFeedback>
          : null}
        <View style={styles.bottomRow} >
          <Pressable onPress={() => imageUploadHandler()} >
            <Ionicons name='camera-outline' size={30} color={'#E5403E'} />
          </Pressable>
          <TextInput
            style={styles.commentInput}
            onChangeText={(text) => setComment(text)}
            value={comment}
            multiline
            placeholder="Leave a comment" />
          <Pressable hitSlop={10} onPress={() => {
            if (comment.length > 0) {
              addComment()
            }
            setComment('')
            Keyboard.dismiss()
          }} >
            <Text style={{ color: comment.length > 0 ? '#E5403E' : '#ffffff50' }}>Send</Text>
          </Pressable>
        </View>
      </View>
      <EditAndDeleteModal
        deletePrompt={'Are you sure you want to delete this image?'}
        bottomSheetRef={bottomSheetRef}
        confirmDeleteRef={confirmDeleteRef}
        deleteFunction={() => {
          setImageURI(null)
          confirmDeleteRef.current?.snapTo(0)
        }}
        editFunction={() => {
          imageUploadHandler()
          bottomSheetRef.current?.snapTo(0)
        }} />
      <Modal
        visible={loading}
        animationType={'fade'}>
        <View style={{ backgroundColor: '#151515', flex: 1 }}>
          <BallIndicator color='white' />
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: '2.5%'
  },
  bottomContainer: {
    borderTopColor: '#2B303C',
    borderTopWidth: 1,
    paddingHorizontal: 10
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#121212',
    color: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 12.5,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-bold'
  },
  image: {
    height: 150,
    width: 100,
    marginTop: 15,
    marginLeft: 40
  }
});

export default RecipeAddComment;