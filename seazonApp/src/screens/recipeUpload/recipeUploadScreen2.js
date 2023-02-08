import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import RecipeMealType from "../../components/recipeMealType";
import RecipeDietary from "../../components/recipeDietary";
import RecipeTags from "../../components/recipeTags";
import RecipeDifficulty from "../../components/recipeDifficulty";

const RecipeUploadScreen2= () => {

  const [tagCount, setTagCount] = useState(0);

  return (
    <ScrollView>
      <View style={styles().section}>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Difficulty</Text>
            <RecipeDifficulty />
          </View>
        </View>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Meal Type</Text>
            <RecipeMealType />
          </View>
        </View>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Dietary</Text>
            <RecipeDietary />
          </View>
        </View>
      </View>
      <View style={styles().section}>
        <Text style={styles().sectionTitle}>Tags<Text style={styles().sectionSubheader}> ({tagCount}/30)</Text></Text>
        <Text style={{paddingHorizontal: 20, paddingBottom: 10, color: '#ffffff80', fontSize: 12}}>You can add some optional tags to help users find your recipes. </Text>
        <RecipeTags tagCount={tagCount} setTagCount={setTagCount} />
      </View>
    </ScrollView>
  )
};

const styles = (animatedValue) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  stepContainer: {
    paddingVertical: 20,
    borderBottomColor: '#ffffff30',
    borderBottomWidth: 1
  },
  text: {
    color: 'white'
  },
  swiperContainer: {
    flex: 1,
  },
  slideContainer: {
    flex: 1
  },
  section: {
    paddingVertical: 10
  },
  multimediaUploadContainer: {
    marginTop: 10,
    backgroundColor: '#121212',
    borderColor: '#ffffff30',
    borderWidth: animatedValue == 250 ? 0 : 1.5,
    height: animatedValue,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  multimediaUploadTitle: {
    fontSize: 12,
    color: '#ffffff',
    paddingTop: 10,
    fontWeight: 'bold'
  },
  outerInputSection: {
    alignItems: 'center'
  },
  buttonSection: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ffffff30',
    borderTopWidth: 1
  },
  sectionTitle: {
    fontSize: 16,
    color: '#ffffff',
    paddingTop: 10,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 10
  },
  sectionSubheader: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#ffffff'
  },
  outerCategoryContainer: {
    alignItems: 'center'
  },
  innerCategoryContainer: {
    width: '90%',
    borderTopColor: '#ffffff20',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 15
  },
  sectionOptionalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});

export default RecipeUploadScreen2;