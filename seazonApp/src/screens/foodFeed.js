import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodFeed = () => {
    return (
        <View style={styles.container}>
            <Text>Food Feed</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
});

export default FoodFeed