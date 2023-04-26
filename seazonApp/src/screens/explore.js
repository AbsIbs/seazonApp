import React, { useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Firebase
import { sendEmailVerification } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore/lite";

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

  const getTimeDifference = () => {
    const previousTimestamp = Timestamp.fromDate(new Date(2022, 0, 1)); // example previous timestamp
    const currentTimestamp = Timestamp.now(); // current timestamp

    const previousDate = previousTimestamp.toDate(); // convert previous timestamp to date object
    const currentDate = currentTimestamp.toDate(); // convert current timestamp to date object

    const timeDiffInMs = currentDate.getTime() - previousDate.getTime(); // calculate time difference in milliseconds
    console.log(timeDiffInMs/3600000/24/365)
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={{ height: 40, width: 40, backgroundColor: 'red' }}
          onPress={() => getTimeDifference()}></TouchableOpacity>
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