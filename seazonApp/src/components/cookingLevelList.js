import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const CookingLevelList = (props) => {

    const [activeIndex, setActiveIndex] = useState({
        'Beginner': false,
        'Intermediate': false,
        'Advanced': false
    });

    // Update object state by making a copy rather than mutating the state
    const toggle = (level) => {
        setActiveIndex(prevState => {
            const nextState = {}
            Object.keys(prevState).forEach(key => {
                if (key==level) {
                    nextState[key] = true
                } else {
                    nextState[key] = false
                }
            })
            return nextState
        })
    };

    // Extract cooking level
        useEffect(() => {
            props.setUserData(prevState => {
             return({...prevState, cookingLevel: Object.keys(activeIndex).find(key => activeIndex[key] === true)})
            }) 
        }, [activeIndex]);

    return(
        <View style={styles().container}>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['Beginner']).button}
                onPress={() => toggle('Beginner')}>
                    <View style={styles().textContainer}>
                        <Text style={styles(activeIndex['Beginner']).title}>Beginner</Text>
                        <Text style={styles(activeIndex['Beginner']).desc}>"I'm cooking just to get by"</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['Intermediate']).button}
                onPress={() => toggle('Intermediate')}>
                    <View style={styles().textContainer}>
                        <Text style={styles(activeIndex['Intermediate']).title}>Intermediate</Text>
                        <Text style={styles(activeIndex['Intermediate']).desc}>"I like experimenting with recipes"</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['Advanced']).button}
                onPress={() => toggle('Advanced')}>
                    <View style={styles().textContainer}>
                        <Text style={styles(activeIndex['Advanced']).title}>Advanced</Text>
                        <Text style={styles(activeIndex['Advanced']).desc}>"Self-proclaimed master chef"</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = (difficulty) => StyleSheet.create({
    container: {
        height: 250
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '100%',
        borderRadius: 24,
        borderColor: difficulty? '#00000000': '#ffffff50',
        backgroundColor: difficulty? '#ffffff': '#00000000',
        borderWidth: 1,
        height: 70,
        flexDirection: 'row'
    },
    textContainer: {
        flex: 7,
        justifyContent: 'center',
        paddingLeft: 20
    },
    imageContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 14,
        color: difficulty? '#000000': '#ffffff',
        fontWeight: 'bold'
    },
    desc: {
        fontSize: 12,
        color: difficulty? '#000000': '#ffffff87'
    },
    image: {
        height: 40,
        width: 40
    }
});

export default CookingLevelList;