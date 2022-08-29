import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const pleaseNote = (text) => {
    return(
        <View style={styles.yellowContainer}>
            <View style={styles.imageContainer}>
                <Image
                style={styles.image}
                source={require('../../assets/img/lightBulbIcon.png')}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    yellowContainer: {
        borderRadius: 30,
        width: '100%',
        borderWidth: 2,
        borderColor: '#EDBA18',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10
    },
    textContainer: {
        flex: 8.5,
        paddingRight: 10
    },
    text: {
        color: '#ffffff',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 12
    },
    image: {
        width: 35,
        height: 35
    }
});

export default pleaseNote;