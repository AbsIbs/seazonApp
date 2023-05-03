import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Goals = (props) => {

    // States
    const [activeIndex, setActiveIndex] = useState({
        'Promoting my business': false,
        'Find cost effective meals': false,
        'Sharing my recipes': false,
        'Eat cleaner': false,
        'Learn how to cook': false
    });

    // Update object state
    const toggleColor = (text) => {
        setActiveIndex(prevState => {
            return ({ ...prevState, [text]: !activeIndex[text] })
        })
    };

    useEffect(() => {
        props.setUserData(prevState => {
            return ({ ...prevState, goals: Object.keys(activeIndex).filter(key => activeIndex[key] === true).map(key => key) })
        })
    }, [activeIndex])

    return (
        <View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity
                    style={styles(activeIndex['Learn how to cook']).button}
                    onPress={() => toggleColor('Learn how to cook')}>
                    <Text style={styles(activeIndex['Learn how to cook']).text}>Learn how to cook</Text>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity
                    style={styles(activeIndex['Sharing my recipes']).button}
                    onPress={() => toggleColor('Sharing my recipes')}>
                    <Text style={styles(activeIndex['Sharing my recipes']).text}>Sharing my recipes</Text>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity
                    style={styles(activeIndex['Eat cleaner']).button}
                    onPress={() => toggleColor('Eat cleaner')}>
                    <Text style={styles(activeIndex['Eat cleaner']).text}>Eat cleaner</Text>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity
                    style={styles(activeIndex['Find cost effective meals']).button}
                    onPress={() => toggleColor('Find cost effective meals')}>
                    <Text style={styles(activeIndex['Find cost effective meals']).text}>Find cost effective meals</Text>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity
                    style={styles(activeIndex['Promoting my business']).button}
                    onPress={() => toggleColor('Promoting my business')}>
                    <Text style={styles(activeIndex['Promoting my business']).text}>Promoting my business</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = (color) => StyleSheet.create({
    buttonContainer: {
        paddingVertical: 10
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        paddingLeft: 20,
        borderColor: '#ffffff50',
        borderWidth: color ? 0 : 1,
        backgroundColor: color ? '#ffffff' : '#00000000'
    },
    text: {
        color: color ? '#000000' : '#ffffff',
        fontSize: 12
    }
});

export default Goals;