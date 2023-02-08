import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import RecipeMacros from "../../components/recipeMacros";

const RecipeUploadScreen5 = () => {

  const [tagCount, setTagCount] = useState(0);

  return (
    <ScrollView>
      <View style={styles.section}>
        <Text style={styles.nutrientsTitle}>Calories <Text style={styles.nutrientsOptional}>(Optional)</Text> </Text>
        <RecipeMacros title='Calories' desc='(kcal)' />
      </View>
      <View style={styles.section}>
        <Text style={styles.nutrientsTitle}>Macro Nutrients <Text style={styles.nutrientsOptional}>(Optional)</Text> </Text>
        <RecipeMacros title='Carbs' desc='(g)' />
        <RecipeMacros title='Fat' desc='(g)' />
        <RecipeMacros title='Protein' desc='(g)' />
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  section: {
    paddingTop: 10,
    paddingBottom: 10
  },
  nutrientsTitle: {
    fontSize: 16,
    color: '#ffffff',
    paddingTop: 10,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 10
  },
  nutrientsOptional: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});

export default RecipeUploadScreen5;