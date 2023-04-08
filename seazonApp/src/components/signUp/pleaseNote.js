import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'

const pleaseNote = (text) => {
    return(
        <View style={styles.yellowContainer}>
            <View style={styles.imageContainer}>
                <AntDesign 
                 size={20}
                 name={'exclamationcircle'} 
                 color={'#EDBA18'} />
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
        borderWidth: 1,
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