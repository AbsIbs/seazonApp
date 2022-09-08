import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const modalOption = (title, imageName) => {
    return(
        <Pressable style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.imageContainer}>
                <MaterialCommunityIcons 
                name={imageName}
                color={'white'}
                size={25}
                />
            </View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: 265,
        borderRadius: 50,
        backgroundColor: '#181818',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: '#ffffff',
        flex: 7,
        paddingLeft: 20
    },
    imageContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default modalOption;