import React, {useRef} from "react";
import { View, Text, StyleSheet } from "react-native";

const RecipeForm = () => {
    const onPressTouch = () => {
        scrollRef.current?.scrollTo({
          y: 0,
          x: Dimensions.get('window').width * 2,
          animated: true, 
        });
        setBannerTitle('hello world')
      }; 
      
    return(
        <View style={styles().container}>
            <Text style={styles().text}>Hello world this is the recipe form</Text>
        </View>
    )
};

const styles = () => StyleSheet.create({
    container: {
        flex: 1,
        color: 'black',
        backgroundColor: '#121212'
    },
    text: {
        color: 'white'
    }
});

export default RecipeForm;