import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const Lifestyle = (props) => {

    const [activeIndex, setActiveIndex] = useState({
        'Not active': false,
        'Active': false,
        'Very active': false
    });

    // Update object state by making a copy rather than mutating the state
    const toggleColor = (lifestyle) => {
        setActiveIndex(prevState => {
            const nextState = {}
            Object.keys(prevState).forEach(key => {
                if (key==lifestyle) {
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
            return({...prevState, lifestyle: Object.keys(activeIndex).find(key => activeIndex[key] === true)})
        }) 
    }, [activeIndex]);

    return(
        <View style={styles().container}>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                 style={styles(activeIndex['Not active']).button}
                 onPress={() => toggleColor('Not active')}>
                    <View style={styles().textContainer}>
                        <Text style={styles(activeIndex['Not active']).title}>I'm not active</Text>
                        <Text style={styles(activeIndex['Not active']).desc}>You don't exercise</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                 style={styles(activeIndex['Active']).button}
                 onPress={() => toggleColor('Active')}>
                    <View style={styles().textContainer}>
                        <Text style={styles(activeIndex['Active']).title}>I'm moderately active</Text>
                        <Text style={styles(activeIndex['Active']).desc}>You exercise once or twice a week</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                 style={styles(activeIndex['Very active']).button}
                 onPress={() => toggleColor('Very active')}>
                    <View style={styles().textContainer}>
                        <Text style={styles(activeIndex['Very active']).title}>I'm very active</Text>
                        <Text style={styles(activeIndex['Very active']).desc}>You exercise 3 or more times per week</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = (lifestyle) => StyleSheet.create({
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
        borderColor: lifestyle? '#00000000': '#ffffff50',
        backgroundColor: lifestyle? '#ffffff': '#00000000',
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
        color: lifestyle? '#000000': '#ffffff',
        fontWeight: 'bold'
    },
    desc: {
        fontSize: 12,
        color: lifestyle? '#000000': '#ffffff87'
    }
});

export default Lifestyle;