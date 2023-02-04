import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import RecipeTiming from "../../components/recipeTiming";

const RecipeUploadScreen2 = () => {

  const [tagCount, setTagCount] = useState(0);

  return (
    <ScrollView>
      <View style={styles.section}>
        <RecipeTiming />
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});

export default RecipeUploadScreen2;