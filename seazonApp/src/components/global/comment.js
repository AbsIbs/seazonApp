import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import GetTimeSincePost from "./getTimeSincePost";
import UserProfileImage from "./userProfileImage";

import uuid from 'react-native-uuid'

import CollapsibleTextView from "./collapsibleTextView";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Firebase Auth
import { getAuth } from "firebase/auth";

// Firebase Firestore
import { doc, setDoc, serverTimestamp, collection, getDoc, getDocs, deleteDoc } from "firebase/firestore/lite";
import { db } from "../../../firebase/firebase-config";

// Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const Comment = (props) => {

  const navigation = useNavigation();

  // OPTIONS FOR COMMENTS. WE CREATE A BOTTOMSHEET FOR THIS
  // Bottom Sheet
  const bottomSheetModalRef = useRef(null)
  // Bottom Sheet backdrop
  const RenderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    []
  );
  // Modal Options
  const CommentOptions = (modalProps) => {
    return (
      <Pressable
        onPress={modalProps.function}
        style={styles.modalOption}>
        <MaterialCommunityIcons
          name={modalProps.icon}
          color={modalProps.icon == 'delete' ? '#800000' : '#ffffff'}
          size={25}
          style={{ paddingLeft: '10%' }} />
        <Text style={[styles.text, { color: modalProps.icon == 'delete' ? '#800000' : '#ffffff' }]}>
          {modalProps.text}
        </Text>
      </Pressable>
    )
  };

  // 1) REPORT A COMMENT IF IT DOES NOT BELONG TO THE USER WHO IS LOGGED IN
  // Modal Body
  const ReportBody = () => {
    return (
      <>
        <CommentOptions text={'Report User'} icon={'flag-variant'} function />
      </>
    )
  };

  // 2) EDIT OR DELETE COMMENT IF IT BELONGS TO THE USER WHO IS LOGGED IN
  // Modal Body
  const EditDeleteCommentBody = () => {
    return (
      <>
        <CommentOptions
          text={'Edit comment'}
          icon={'file-document-edit'}
          function={() => {
            bottomSheetModalRef.current.dismiss()
            navigation.navigate('Recipe Edit Comment', {
              commentObject: props
            })
          }} />
        <CommentOptions text={'Delete comment'} icon={'delete'} function />
      </>
    )
  };

  // To control which comment option will show, we will check if the userID matches the logged in user's ID
  const auth = getAuth()
  const user = auth.currentUser
  const editable = user.uid === props.userID
  const snapPoints = useMemo(() => (editable ? [150] : [100]), []);
  // callbacks
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  // CHECKING THE NUMBER OF LIKES A COMMENT HAS
  // ---------------------------------------------------
  // Create a state the store the number of likes
  const [numberOfLikes, setNumberOfLikes] = useState()
  // Create a function to retrieve the number of likes
  const checkNumberOfLikes = async () => {
    const subCollectionRef = collection(db, 'comments', props.commentID, 'likes')
    const snapshot = await getDocs(subCollectionRef)
    setNumberOfLikes(snapshot.size)
  }
  // We run the check when a comment is loaded
  useEffect(() => {
    checkNumberOfLikes()
  }, [])


  // CHECKING TO SEE IF THE USER HAS LIKED THE COMMENT
  // Unique ID for the like
  const likeID = uuid.v4()
  // First, we set our like states to track if a comment has been liked
  const [liked, setLiked] = useState(null)
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
  /*   useEffect(() => {
      checkDocumentExists()
    }, []) */


  // TOGGLING A LIKE
  // -----------------
  // The comment reference that creates a like sub-collection. We do it in this format so we can
  // create our own id for the newly created document using setDoc. The ID will be the userID. If we did not do this, we'd have
  // to use addDoc and that would let firebase create an automatically generated key
  const userIDcommentDocRef = doc(db, 'comments', props.commentID, 'likes', props.userID)
  // Data to put posted in like document
  const likeData = {
    timestamp: serverTimestamp(),
    likeID: likeID,
    recipeID: props.recipeID,
    userID: props.userID
  };
  // We create a function to toggle the like
  const toggleLike = async () => {
    // If currently liked, delete the like
    if (liked) {
      await deleteDoc(doc(likesSubCollectionRef, props.userID));
      // We reduce the displayed number of likes by 1 on the frontend. This is to avoid an unnecessary read request to the backend
      setNumberOfLikes(numberOfLikes - 1)
      console.log('deleted like')
    } else {
      // If it is not currently liked, then like the document
      await setDoc(userIDcommentDocRef, likeData);
      // We increase the displayed number of likes by 1 on the frontend. This is to avoid an unnecessary read request to the backend
      setNumberOfLikes(numberOfLikes + 1)
      console.log('like added')
    }
    setLiked(!liked)
    console.log('Like toggled')
  }

  return (
    <>
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
            <Pressable hitSlop={10} onPress={() => handlePresentModalPress()}>
              <SimpleLineIcons name="options" color='#ffffff' size={20} style={{ paddingLeft: 10 }} />
            </Pressable>
          </View>
          {props.coverImageURL ?
            <Image
              borderRadius={8}
              source={{ uri: props.coverImageURL }}
              style={styles.image} /> : null}
          <CollapsibleTextView text={props.comment} maxLines={5} />
          <View style={styles.likeContainer}>
            <Pressable onPress={() => toggleLike()} >
              {liked ?
                <FontAwesome name="thumbs-up" color={'#ffffff'} size={17.5} />
                : <FontAwesome name="thumbs-o-up" color={'#ffffff'} size={17.5} />}
            </Pressable>
            <Text style={{ paddingLeft: 5, paddingRight: 20 }}>{numberOfLikes}</Text>
          </View>
        </View>
      </View>
      {/* We give a name to the modal to avoid memory leaks */}
      <BottomSheetModal
        name="Comment Options"
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={RenderBackdrop}
        backgroundStyle={{ backgroundColor: '#121212' }}
        handleIndicatorStyle={{ backgroundColor: '#ffffff' }}>
        {/* If the comment is editable, then we return the edit/delete modal else, we return the report modal */}
        {editable ? <EditDeleteCommentBody /> : <ReportBody />}
      </BottomSheetModal>
    </>
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
  },
  /* Comment Options */
  body: {
    alignItems: 'center',
    flex: 1
  },
  modalOption: {
    width: '80%',
    height: 50,
    borderColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    paddingLeft: '10%',
    fontWeight: '400',
    fontSize: 14,
    flex: 1
  }
});

export default Comment;