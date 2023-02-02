import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'


const RecipeTags = (props) => {

  const [tags, setTags] = useState([])
  const [inputText, setInputText] = useState('')

  const tagsListFunction = () => {
    return tags.map((tag, index) => {
      return (
        <View
          style={{ padding: 5 }}
          key={index}>
          <Pressable
            style={styles().tags}
            onPress={() => deleteTag(index)}>
            <Text style={styles().tagText}>{tag}</Text>
            <View style={styles().iconContianer}>
              <Entypo
                size={15}
                name='cross'
                color='#ffffff'
              />
            </View>
          </Pressable>
        </View>
      )
    })
  }

  /*     const addTag = (text) => {
          const textList = text.trimStart().split('')
          if (textList[textList.length -1] === " ") {
              if (textList[0] != '#') {
                  setTags([...tags, '#' + text.trim().toLowerCase()]);    
              } else {
                  setTags([...tags, text.trim().toLowerCase()]);
              }
          };   
      } */

  const addTagSubmit = (event) => {
    const textSubmitList = event.nativeEvent.text.trim().split('')
    if (textSubmitList.length == 0) {
      alert("Please enter a tag e.g. 'healthy' ")
    } else {
      setTags([...tags, event.nativeEvent.text.trim().toLowerCase()]);
    }
    setInputText('');
  };


  const deleteTag = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  }

  useEffect(() => {
    props.setTagCount(tags.length);
  }, [tags]);

  return (
    <View style={styles().outerContainer}>
      <View
        style={styles().innerContainer}>
        {tagsListFunction()}
        <TextInput
          style={styles().tagInput}
          multiline={false}
          placeholder=" e.g. healthy"
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={(event) => addTagSubmit(event)}
          value={inputText}
          maxLength={20} />
      </View>
    </View>
  )
};

const styles = () => StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'center'
  },
  innerContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ffffff20',
    borderRadius: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  tags: {
    backgroundColor: '#E32828',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tagText: {
    color: '#ffffff',
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  tagInput: {
    width: '100%'
  },
  iconContianer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5
  }
});

export default RecipeTags;