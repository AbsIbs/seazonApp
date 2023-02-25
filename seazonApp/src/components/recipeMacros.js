import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const RecipeMacros = (props) => {

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles().container}>
        <View style={styles(props.title).contentContianer}>
          <View style={styles().textContainer}>
            <View>
              <Text style={styles().title}>{props.title}</Text>
              <Text style={styles().desc}>{props.desc}</Text>
            </View>
          </View>
          <View style={styles().inputContainer}>
            <TextInput
              placeholder="-"
              maxLength={5}
              keyboardType="numeric"
              clearTextOnFocus={true}
              onChangeText={(text) => {
                props.setFunction(prevState => {
                  return ({
                    ...prevState, macros: { ...prevState.macros, [props.title.toLowerCase()]: text }
                  })
                })
              }}
              style={{ color: '#E84A4A', fontWeight: 'bold', textAlign: 'right', flex: 1 }}
              placeholderTextColor='#E84A4A' />
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = (title) => StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row'
  },
  contentContianer: {
    borderTopWidth: 1,
    borderBottomWidth: title == 'Protein' ? 1 : 0,
    borderColor: '#ffffff20',
    flexDirection: 'row',
    width: '100%'
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  inputContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    fontSize: 13,
    color: '#ffffff'
  },
  desc: {
    fontSize: 11,
    color: '#757882'
  }
});

export default RecipeMacros;