import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const CookingOften = (props) => {

    const [activeIndex, setActiveIndex] = useState({
        'Infrequently': false,
        'Sometimes': false,
        'Often': false
    });

    // Update object state by making a copy rather than mutating the state
    const toggle = (frequency) => {
        setActiveIndex(prevState => {
            const nextState = {}
            Object.keys(prevState).forEach(key => {
                if (key==frequency) {
                    nextState[key] = true
                } else {
                    nextState[key] = false
                }
            })
            return nextState
        })
    };

    // Extract cooking frequency
    useEffect(() => {
        props.setUserData(prevState => {
            return({...prevState, attributes: {...prevState.attributes, cookingFrequency: Object.keys(activeIndex).find(key => activeIndex[key] === true)}})
        }) 
    }, [activeIndex]);

    return(
        <View style={styles().container}>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['Infrequently']).button}
                onPress={() => toggle('Infrequently')}>
                    <View style={styles().textContainer}>
                        <Text style={styles(activeIndex['Infrequently']).title}>Infrequently</Text>
                        <Text style={styles(activeIndex['Infrequently']).desc}>Once or twice a week</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['Sometimes']).button}
                onPress={() => toggle('Sometimes')}>
                    <View style={styles().textContainer}>
                        <Text style={styles(activeIndex['Sometimes']).title}>Sometimes</Text>
                        <Text style={styles(activeIndex['Sometimes']).desc}>3-5 times a week</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['Often']).button}
                onPress={() => toggle('Often')}>
                    <View style={styles().textContainer}>
                        <Text style={styles(activeIndex['Often']).title}>Often</Text>
                        <Text style={styles(activeIndex['Often']).desc}>More than 5 times a week</Text>
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
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
    },
    title: {
        fontSize: 14,
        color: difficulty? '#000000': '#ffffff',
        fontWeight: 'bold'
    },
    desc: {
        fontSize: 12,
        color: difficulty? '#000000': '#ffffff87'
    }
});

export default CookingOften;