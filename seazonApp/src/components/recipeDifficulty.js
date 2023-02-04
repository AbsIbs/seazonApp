import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const recipeDifficulty = () => {

    const [simple, setSimple] = useState(false)
    const [intermediate, setIntermediate] = useState(false)
    const [advanced, setAdvanced] = useState(false)

    const difficultiesList = [
        {'setFunction': setSimple, 'setValue': simple},
        {'setFunction': setIntermediate, 'setValue': intermediate},
        {'setFunction': setAdvanced, 'setValue': advanced}
    ]

    const toggleColor = (index) => {
        for (let i=0; i < difficultiesList.length; i++) {
            difficultiesList[i]['setFunction'](false)
        }
        const difficulty = difficultiesList[index]
        const setFunction = difficulty['setFunction']
        const setValue = difficulty['setValue']
        setFunction(!setValue);
    };
    
    return(
        <View style={styles().outerContainer}>
            <View style={styles().innerContainer}>
                <View style={styles().difficultContainer}>
                    <TouchableOpacity 
                    style={styles(simple).difficulty}
                    onPress={() => toggleColor(0)}>
                        <Text style={styles(simple).difficultyName}>Simple</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().difficultContainer}>             
                    <TouchableOpacity 
                    style={styles(intermediate).difficulty}
                    onPress={() => toggleColor(1)}>
                        <Text style={styles(intermediate).difficultyName}>Intermediate</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().difficultContainer}>
                    <TouchableOpacity 
                    style={styles(advanced).difficulty}
                    onPress={() => toggleColor(2)}>
                        <Text style={styles(advanced).difficultyName}>Advanced</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = (state) => StyleSheet.create({
    outerContainer: {
        alignItems: 'center'
    },
    innerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    difficultContainer: {
        flex: 1,
        alignItems: 'center'
    },
    difficulty: {
        width: '95%',
        borderWidth: state == true? 0: 1,
        borderColor: '#2B303C',
        backgroundColor: state == true? '#ffffff': '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius: 4
    },
    difficultyName: {
        color: state == true? '#000000': '#ffffff',
        fontSize: 12
    }
});

export default recipeDifficulty;