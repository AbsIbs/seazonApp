import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Settings = () => {
    return(
        <View style={styles.container}>
            <Text style={{fontSize: 30, color: 'black'}}>Settings</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Settings;