import React, { useState, useCallback } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import MentionHashtagTextView from "react-native-mention-hashtag-text";

const CollapsibleTextView = (props) => {

  const [expand, setExpand] = useState(false);
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > props.maxLines); //to check the text is more than max lines or not
    /* console.log(e.nativeEvent.lines.length); */
  }, []);

  return (
    <>
      <MentionHashtagTextView
        numberOfLines={expand ? undefined : props.maxLines}
        style={styles.body}
        mentionHashtagColor={"#E32828"}
        onTextLayout={onTextLayout}>
        {props.text}
      </MentionHashtagTextView>
      {/* If the total text length is greater than the max preview length then display the see more option */}
      {lengthMore && expand == false ?
        <Pressable onPress={() => setExpand(true)} hitSlop={10} >
          <Text style={styles.seeMore} >See more</Text>
        </Pressable> : null
      }
    </>
  )
};

const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    lineHeight: 25,
    fontFamily: 'Poppins-Regular',
  },
  seeMore: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#E32828'
  }
});

export default CollapsibleTextView;

