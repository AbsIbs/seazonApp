import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const SimpleHeader = (props) => {

  const navigation = useNavigation()

  const backHandler = () => {
    navigation.goBack()
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: props.backgroundColor ? props.backgroundCOlor : '#121212' }
    ]} >
      <Pressable onPress={() => backHandler()} hitSlop={10} >
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color={'white'} />
      </Pressable>
      <Text style={styles.title} >{props.title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  title: {
    color: '#ffffff',
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    paddingLeft: 20
  }
});

export default SimpleHeader;