import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import GetTimeSincePost from "./getTimeSincePost";
import UserProfileImage from "./userProfileImage";

import uuid from 'react-native-uuid'

// Firebase Firestore
import { doc, setDoc, serverTimestamp, collection, getDoc, deleteDoc } from "firebase/firestore/lite";
import { db } from "../../../firebase/firebase-config";

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const Comment = (props) => {

  const [liked, setLiked] = useState(null)
  const likeID = uuid.v4()

  // The comment reference that creates a like sub-collection. We do it in this format so we can
  // create our own id for the newly created document using setDoc. The ID will be the userID. If we did not do this, we'd have
  // to use addDoc and that would let firebase create an automatically generated key
  const userIDcommentDocRef = doc(db, 'comments', props.commentID, 'likes', props.userID)

  // We create a separate reference for the likes subCollection
  const commentDocRef = doc(db, 'comments', props.commentID)
  const likesSubCollectionRef = collection(commentDocRef, 'likes')

  // We check to see if the user has already liked the comment by checking if there is a document that
  // has an ID equal to the userID
  const checkDocumentExists = async () => {
    const documentSnapshot = await getDoc(doc(likesSubCollectionRef, props.userID));
    const exists = documentSnapshot.exists();
    if (exists) {
      // If they have liked the commnet, then set the liked variable to true
      setLiked(true)
    } else {
      console.log('Document does not exist');
    }
  };

  // We run this code when a comment is loaded
  useEffect(() => {
    checkDocumentExists()
  }, [])

  const likeData = {
    timestamp: serverTimestamp(),
    likeID: likeID,
    recipeID: props.recipeID,
    userID: props.userID
  };

  const toggleLike = async () => {
    // If currently liked, delete the like
    if (liked) {
      await deleteDoc(doc(likesSubCollectionRef, props.userID));
      console.log('deleted like')
    } else {
    // If it is not currently liked, then like the document
      await setDoc(userIDcommentDocRef, likeData);
      console.log('like added')
    }
    setLiked(!liked)
    console.log('Like toggled')
  }

  // Get comment data
  return (
    <View style={styles.container}>
      <UserProfileImage
        height={35}
        width={35}
        borderWidth={0}
        source={{ uri: props.profileImageURL }} />
      <View style={{ flex: 1, marginLeft: 15 }} >
        <View style={{ flexDirection: 'row', flex: 1 }} >
          <Text style={styles.author}>{props.author}</Text>
          <Text><GetTimeSincePost timestamp={props.timestamp} /></Text>
          <Pressable>
            <SimpleLineIcons name="options" color='#ffffff' size={20} style={{ paddingLeft: 10 }} />
          </Pressable>
        </View>
        {props.coverImageURL ?
          <Image
            borderRadius={8}
            source={{ uri: props.coverImageURL }}
            style={styles.image} /> : null}
        <Text style={styles.comment}>{props.comment}</Text>
        <View style={styles.likeContainer}>
          <Pressable onPress={() => toggleLike()} >
            {liked ?
              <FontAwesome name="thumbs-up" color={'#ffffff'} size={17.5} />
              : <FontAwesome name="thumbs-o-up" color={'#ffffff'} size={17.5} />}
          </Pressable>
          <Text style={{ paddingLeft: 5, paddingRight: 20 }}>14</Text>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 30
  },
  /* Comments */
  author: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: '#ffffff',
    flex: 1
  },
  comment: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#ffffff',
    flex: 1
  },
  image: {
    height: 150,
    width: 100,
    marginVertical: 10
  },
  likeContainer: {
    paddingTop: 15,
    flexDirection: 'row'
  }
});

export default Comment;