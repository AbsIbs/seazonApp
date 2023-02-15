import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import RecipeMealType from "../../components/recipeMealType";
import RecipeDietary from "../../components/recipeDietary";
import RecipeTags from "../../components/recipeTags";
import RecipeDifficulty from "../../components/recipeDifficulty";

const RecipeUploadScreen2 = (props) => {

  const [tagCount, setTagCount] = useState(0);

  return (
    <ScrollView>
      <View style={{ paddingBottom: 10 }}>
        <Text style={styles().sectionTitle}>Tags<Text style={styles().sectionSubheader}> ({tagCount}/30)</Text></Text>
        <Text style={{ paddingHorizontal: 20, paddingBottom: 10, color: '#ffffff80', fontSize: 12 }}>You can add some optional tags to help users find your recipes. </Text>
        <RecipeTags tagCount={tagCount} setTagCount={setTagCount} setRecipeObject={props.setRecipeObject} />
      </View>
      <View style={styles().section}>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Difficulty</Text>
            <RecipeDifficulty setRecipeObject={props.setRecipeObject} />
          </View>
        </View>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Meal Type</Text>
            <RecipeMealType setRecipeObject={props.setRecipeObject} />
          </View>
        </View>
        <View style={styles().outerCategoryContainer}>
          <View style={styles().innerCategoryContainer}>
            <Text style={styles().sectionSubheader}>Dietary</Text>
            <RecipeDietary setRecipeObject={props.setRecipeObject} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
};

const styles = () => StyleSheet.create({
  section: {
    paddingVertical: 10
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
    fontSize: 14,
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
  }
});

export default RecipeUploadScreen2;