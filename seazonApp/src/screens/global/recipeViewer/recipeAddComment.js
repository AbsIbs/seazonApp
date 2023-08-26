import React, { useState, useRef } from "react";
import { View, StyleSheet, TextInput, Text, Pressable, Keyboard, RefreshControl, Image, TouchableWithoutFeedback, Modal } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ActivityIndicator } from 'react-native';

import { FlashList } from "@shopify/flash-list";

// Firebase Firestore
import { getComments } from "../../../logic/backendLogic/commentsBackendLogic";
import { getFunctions, httpsCallable } from "firebase/functions";

import Comment from "../../../components/global/comment";
import { launchImageLibrary } from "react-native-image-picker"
import { BallIndicator } from 'react-native-indicators';
import EditAndDeleteModal from "../../../components/global/editAndDeleteModal";
import SimpleHeader from "../../../components/global/simpleHeader";

const RecipeAddComment = (props) => {

  const recipeID = props.route.params.recipe.recipeID
  const bottomSheetRef = useRef(null)
  const confirmDeleteRef = useRef(null)

  // Comment to be posted
  const [comment, setComment] = useState('')
  const [imageURI, setImageURI] = useState(null)
  const [displayImageURI, setDisplayImageURI] = useState(null)

  // Comments from database
  const [comments, setComments] = useState([])
  const [lastPostID, setLastPostID] = useState(null);

  // Loading screen
  const [loading, setLoading] = useState(false)

  // Cloud functions
  const functions = getFunctions()
  const createComment = httpsCallable(functions, 'comments-postComment')

  // Upload comment
  const addComment = async () => {
    setLoading(true)
    // Form the comment document to be uploaded
    const commentData = {
      comment: comment,
      recipeID: recipeID,
      coverImage: imageURI
    }
    createComment(commentData)
      .then(() => {
        // Refresh comments
        refreshComments()
      }).then(() => {
        // Clear the picture
        setDisplayImageURI(null)
      })
      .then(() => {
        setImageURI(null)
      })
      .then(() => {
        setLoading(false)
      })
  }

  // Attach image as base64 format
  const imageUploadHandler = () => {
    const options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        null
      } else {
        /* Save the image */
        setImageURI({ uri: response.assets[0].base64 })
        return response
      }
    }).then((response) => {
      setDisplayImageURI({ uri: response.assets[0].uri })
    });
  };

  // Refresh control
  const [refreshing, setRefreshing] = useState(false);
  const [bottomRefreshing, setBottomRefreshing] = useState(false);

  // On refresh comments
  const refreshCommentsHandler = async () => {
    setRefreshing(true);
    getComments({ recipeID: recipeID })
      .then((result) => {
        if (result) {
          setComments(result)
          return result
        }
      }).then((result) => {
        if (result.length > 0) {
          setLastPostID(result[result.length - 1]);
        } else {
          setLastPostID(null);
        }
      }).then(() => {
        setRefreshing(false)
      })
  };

  // Get more comments
  const getMoreCommentsHandler = () => {
    if (!lastPostID) return;
    setBottomRefreshing(true)
    getRecipes({ lastPostID: lastPostID })
      .then(result => {
        setComments(prevState => {
          return ([...prevState, ...result])
        })
        return result
      })
      .then(result => {
        setLastPostID(result[result.length - 1].id)
        setBottomRefreshing(false)
      })
      .catch(error => {
        console.log(error)
      })
  };

  return (
    <>
      <SimpleHeader title={'Comments'} />
      <View style={styles.container}>
        <View style={styles.contentContainer} >
          {/* Render Comments */}
          <FlashList
            data={comments}
            estimatedItemSize={500}
            onEndReached={() => getMoreCommentsHandler()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => {
              if (bottomRefreshing) {
                return (<ActivityIndicator style={{ backgroundColor: '#000' }} />)
              } else {
                return (null)
              }
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => refreshCommentsHandler()} />
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
                  coverImageURL={item.coverImageURL}
                  edited={item.edited} />
              )
            }}
          />
        </View>
        {/* Bottom section with add comment component */}
        <View style={styles.bottomContainer}>
          {displayImageURI != null ?
            <TouchableWithoutFeedback onPress={() => bottomSheetRef.current?.snapTo(1)} >
              <Image
                source={displayImageURI}
                borderRadius={8}
                style={styles.image}
              />
            </TouchableWithoutFeedback>
            : null}
          <View style={styles.bottomRow} >
            <TextInput
              style={styles.commentInput}
              onChangeText={(text) => setComment(text)}
              value={comment}
              multiline
              placeholder="Leave a comment..." />
            <View style={styles.iconsContainer} >
              <Pressable onPress={() => imageUploadHandler()} >
                <Ionicons name='camera-outline' size={30} color={'#E5403E'} />
              </Pressable>
              <Pressable hitSlop={10} onPress={() => {
                if (comment.length > 0) {
                  addComment()
                }
                setComment('')
                Keyboard.dismiss()
              }} >
                <Text style={{
                  color: comment.length > 0 ? '#E5403E' : '#ffffff50'
                }}>Send</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <EditAndDeleteModal
        editText={'Replace image'}
        deleteText={'Delete image'}
        deletePrompt={'Delete this image?'}
        bottomSheetRef={bottomSheetRef}
        confirmDeleteRef={confirmDeleteRef}
        deleteFunction={() => {
          setDisplayImageURI(null)
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
    </>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    maxHeight: '60%'
  },
  bottomRow: {
    paddingVertical: 5,
    backgroundColor: '#121212',
    borderRadius: 8,
    paddingHorizontal: 20
  },
  commentInput: {
    color: '#ffffff',
    borderBottomColor: '#ffffff20',
    borderBottomWidth: 1,
    lineHeight: 25
  },
  image: {
    height: 150,
    width: 100,
    marginVertical: 15,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5
  }
});

export default RecipeAddComment;