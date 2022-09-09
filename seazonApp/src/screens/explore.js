import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";

const Explore = ( {navigation} ) => {

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