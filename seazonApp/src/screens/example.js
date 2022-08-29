import React, { Component, useRef } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, ScrollView, Button } from 'react-native';

var screenWidth = Dimensions.get('window').width;

const toNextPage = () => {
    screenIndex += 1;
    scrollViewRef.current?.scrollTo({x: window.width * screenIndex, animated: true});
 };

const Example = () => {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.ButtonViewContainer}>
          <View style={styles.ButtonContainer}>
            <Button title="Screen 1" onPress={toNextPage} />
          </View>
          <View style={styles.ButtonContainer}>
            <Button title="Screen 2" onPress={toNextPage} />
          </View>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          ref={useRef(null)}
        >
          <View style={styles.ScrollContainer}>
            <Text style={styles.ScrollTextContainer}>
              Screen 1
              </Text>
          </View>
          <View style={styles.ScrollContainer}>
            <Text style={styles.ScrollTextContainer}>
              Screen 2
              </Text>
          </View>
        </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#abe3a8',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  ScrollContainer: {
    backgroundColor: '#cdf1ec',
    flexGrow: 1,
    marginTop: 0,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ScrollTextContainer: {
    fontSize: 20,
    padding: 15,
    color: '#000',
    textAlign: 'center'
  },
  ButtonViewContainer: {
    flexDirection: 'row',
    paddingTop: 35,
  },
  ButtonContainer: {
    padding: 30,
  },
});

export default Example;