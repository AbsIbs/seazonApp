import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, ScrollView, Text, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import uuid from 'react-native-uuid'

import { doc, setDoc, addDoc, serverTimestamp, collection } from "firebase/firestore/lite";
import { db } from "../../../../firebase/firebase-config";
import { getAuth } from "firebase/auth";

const RecipeAddComment = (props) => {

  const recipeID = props.route.params.recipe.recipeID
  const commentID = uuid.v4()
  const [comment, setComment] = useState('')

  const auth = getAuth();
  const user = auth.currentUser

  const commentsCollectionRef = collection(doc(db, "recipes", recipeID), 'comments')

  const addComment = async () => {
    const commentData = {
      commentID: commentID,
      timestamp: serverTimestamp(),
      userID: user.uid,
      comment: comment
    }
    await addDoc(commentsCollectionRef, commentData)
    console.log('Comment Added')
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontFamily: 'Poppins' }}>HELLO WORLD THIS IS ABASS SPEAKING</Text>
      </ScrollView>
      <View style={styles.bottomContainer} >
        <Ionicons name='camera-outline' size={30} color={'#E5403E'} />
        <TextInput
          style={styles.commentInput}
          onChangeText={(text) => setComment(text)}
          value={comment}
          multiline
          autoFocus
          placeholder="Leave a comment" />
        <Pressable hitSlop={10} onPress={() => {
          if(comment.length > 0) {
            addComment()
          }
          setComment('')
        }} >
          <Text style={{ color: comment.length > 0 ? '#E5403E' : '#ffffff50' }}>Send</Text>
        </Pressable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  contentContainer: {
    flex: 1
  },
  bottomContainer: {
    borderTopColor: '#2B303C',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  commentInput: {
    backgroundColor: '#121212',
    color: '#ffffff',
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 12.5,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-bold'
  }
});

export default RecipeAddComment;