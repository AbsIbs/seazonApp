import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ShoppingList = () => {
    return(
        <View style={styles.container}>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    text: {
        color: 'white'
    }
});

export default ShoppingList;