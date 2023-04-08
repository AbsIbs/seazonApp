import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground, Pressable, TouchableOpacity } from "react-native";

import Swiper from "react-native-web-swiper";
import { Bar } from 'react-native-progress'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import uuid from 'react-native-uuid'

const RecipePreviewSteps = (props) => {
  const steps = props.steps
  const windowWidth = Dimensions.get('window').width;

  const swiperRef = useRef();
  const [progress, setProgress] = useState(1 / steps.length);
  const [index, setIndex] = useState(0);

  /* Header Component */
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}>
          <Pressable
            onPress={() => props.setStepsModal(false)}
            hitSlop={10}>
            <MaterialCommunityIcons
              name={'chevron-down'}
              color={'white'}
              size={30} />
          </Pressable>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: 'white' }} >Step {index + 1} of {steps.length}</Text>
        </View>
      </View>
    )
  };

  /* This will be the render for each page on the swiper */
  const Page = (pageProps) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: '100%', height: '50%' }}>
          <ImageBackground
            source={pageProps.coverImage}
            resizeMode='cover'
            style={{ height: '100%', width: '100%' }}>
          </ImageBackground>
        </View>
        <ScrollView style={styles.contentContainer}>
          {/* Direction container*/}
          <View>
            {/* Direction title */}
            <View style={{ paddingTop: 20, paddingBottom: 5, borderBottomColor: '#2B303C', borderBottomWidth: 1 }}>
              <Text style={styles.title}>Directions</Text>
            </View>
            {/* Directions */}
            <Text style={styles.directions}>{pageProps.instructions}</Text>
          </View>
        </ScrollView>
      </View>
    )
  };

  const nextHandler = () => {
    if (index+1 == steps.length) {
      props.setStepsModal(false)
    } else {
      swiperRef.current.goToNext();
      setProgress(progress + 1 / steps.length)
    }
  };

  const backHandler = () => {
    swiperRef.current.goToPrev();
    setProgress(progress - 1 / steps.length)
  }

  return (
    <View style={styles.container} >
      <Header />
      <Bar
        progress={progress}
        width={windowWidth}
        height={2.5}
        color={'red'}
        unfilledColor={'#000000'}
        borderWidth={0}
        useNavitveDriver />
      <Swiper
        controlsProps={{
          prevPos: false,
          dotsPos: false,
          nextPos: false
        }}
        ref={swiperRef}
        gesturesEnabled={() => false}
        onIndexChanged={index => setIndex(index)}>
        {steps.map((step, index) => {
          const key = uuid.v4()
          return (
            <Page
              key={key}
              coverImage={step.coverImage}
              instructions={step.instructions}
            />
          )
        })}
      </Swiper>
      {/* If the user is not on the first page, then render both next and back buttons */}
      {index > 0 ?
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.button, { borderColor: '#757882', borderWidth: 0.5 }]}
            onPress={() => backHandler()} >
            <Text style={styles.buttonLabel}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#E32828' }]}
            onPress={() => nextHandler()} >
            <Text style={styles.buttonLabel}>Next</Text>
          </TouchableOpacity>
        </View>
        :
        /* If the user is on the first page, then render just the next button */
        <View style={styles.buttonSection}>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#E32828' }]}
              onPress={() => nextHandler()} >
              <Text style={styles.buttonLabel}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    width: '100%'
  },
  headerIcon: {
    width: 40,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center'
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'white'
  },
  directions: {
    paddingTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 20
  },
  buttonSection: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  button: {
    height: 35,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonLabel: {
    color: 'white',
    fontFamily: 'Poppins-Regular'
  }
});

export default RecipePreviewSteps;