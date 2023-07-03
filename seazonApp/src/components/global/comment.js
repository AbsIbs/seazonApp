import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import GetTimeSincePost from "./getTimeSincePost";
import UserProfileImage from "./userProfileImage";

const Comment = (props) => {

  return (
    <View style={styles.container}>
      <UserProfileImage
        height={35}
        width={35}
        borderWidth={0}
        source={{ uri: props.profileImageURL }} />
      <View style={{ flex: 1, marginLeft: 15 }} >
        <View style={{ flexDirection: 'row', flex: 1, paddingBottom: 5 }} >
          <Text style={styles.author}>{props.author}</Text>
          <Text><GetTimeSincePost timestamp={props.timestamp} /></Text>
        </View>
        <Text style={styles.comment}>{props.comment}</Text>
        {props.coverImageURL != null ?
          <Image
            source={{ uri: props.coverImageURL }}
            style={styles.image} /> : null}
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
    fontSize: 15,
    color: '#ffffff',
    flex: 1
  },
  image: {
    height: 40,
    width: 25
  }
});

export default Comment;