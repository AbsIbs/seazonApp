import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CollapsibleTextView from "../components/global/collapsibleTextView";

// Firebase
import { sendEmailVerification } from "firebase/auth";
import { getAuth } from "firebase/auth";

// Global state
import { AuthContext } from '../../Global/AuthContext';

const Explore = () => {

  const auth = getAuth();
  const navigation = useNavigation()
  const { isUserNew, setIsUserNew } = useContext(AuthContext);

  useEffect(() => {
    if (isUserNew) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          setIsUserNew(false)
        })
    }
  }, []);

  const Icon = (props) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name={props.name}
          size={15}
          color={'white'} />
      </View>
    )
  };

  const actions = [{
    text: "Recipe",
    icon: <Icon name='note-plus' />,
    name: 'Recipe Form Stack',
    position: 1,
    color: '#E84A4A'
  }];

  const Example = () => {
    return (
      <>
        <Text>Hello world</Text>
      </>
    )
  };

  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      <View style={styles.container}>
        <CollapsibleTextView maxLines={2} text='hello my name is afod nfa nsf nasf naslf ndajks fndjklas 
        dfnajks fjfiadsn fs a fafmio;d dfnajks fjfiadsn fs a fafmio;d dfnajks fjfiadsn fs a fafmio;d
        dfnajks fjfiadsn fs a fafmio;d dfnajks fjfiadsn fs a fafmio;d dfnajks fjfiadsn fs a fafmio;d
        dfnajks fjfiadsn fs a fafmio;d dfnajks fjfiadsn fs a fafmio;d dfnajks fjfiadsn fs a fafmio;d' />
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            navigation.navigate(name);
          }}
          color='#E84A4A'
          distanceToEdge={{ vertical: 20, horizontal: 20 }}
          overlayColor='#00000000' />
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  text: {
    color: 'white'
  },
  button: {
    height: 60,
    width: 50
  }
});

export default Explore;