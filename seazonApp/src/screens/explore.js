import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DockHeader from "../components/dockHeader";

const Explore = () => {
    return(
        <View style={styles.container}>
            <Text>Explore</Text>
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

export default Explore;