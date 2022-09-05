import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ShoppingList = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Hello world</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    text: {
        color: 'white'
    }
});

export default ShoppingList;