import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import ErrorModal from "./errorModal";

const AlternativeTagList = (props) => {

  const [tags, setTags] = useState([]);
  const [inputText, setInputText] = useState('');
  const [alternativesErrorModal, setAlternativesErrorModal] = useState(false)

  const maxLength = 3

  const TagsListFunction = () => {
    return tags.map((tag, index) => {
      return (
        <View style={{ padding: 5 }} key={index}>
          <Pressable
            style={styles.tags}
            onPress={() => deleteTag(index)}>
            <Text style={styles.tagText}>{tag}</Text>
            <View style={styles.iconContianer}>
              <Entypo size={15} name='cross' color='#ffffff' />
            </View>
          </Pressable>
        </View>
      )
    })
  };

  const addTagSubmit = (event) => {
    if (tags.length < maxLength) {
      const textSubmitList = event.nativeEvent.text.trim().split('')
      if (textSubmitList.length != 0) {
        setTags([...tags, event.nativeEvent.text.trim().toLowerCase()]);
      }
      setInputText('');
    } else {
      setAlternativesErrorModal(true)
    }
  };

  useEffect(() => {
    props.setIngredient(prevState => {
      return ({ ...prevState, alternatives: tags })
    })
  }, [tags])

  const deleteTag = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

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

  return (
    <>
      <View style={styles.innerContainer}>
        <TagsListFunction />
        <TextInput
          style={styles.tagInput}
          multiline={false}
          placeholder={props.placeholder}
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={(event) => addTagSubmit(event)}
          value={inputText}
          maxLength={20} />
      </View>
      <Text style={[styles.tagCounter, { color: tags.length < maxLength ? '#ffffff90' : '#E32828' }]}>Limit: {tags.length}/{maxLength} </Text>
      <ErrorModal Title={'Hold on!'} Desc={"You've reached the maximum number of alternative ingredients."} visible={alternativesErrorModal} setVisible={setAlternativesErrorModal} />
    </>
  )
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#2B303C',
    borderRadius: 4,
    backgroundColor: '#121212',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  tags: {
    backgroundColor: '#E32828',
    borderRadius: 4,
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
    width: '100%',
    paddingHorizontal: 10
  },
  iconContianer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5
  },
  tagCounter: {
    alignSelf: 'flex-end',
    fontSize: 12,
    paddingTop: 10,
    fontWeight: 'bold'
  }
});

export default AlternativeTagList;