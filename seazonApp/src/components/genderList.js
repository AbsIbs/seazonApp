import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const GenderList = (props) => {

    // states
    const [activeIndex, setActiveIndex] = useState({
        'Male': false,
        'Female': false,
        'Other': false
    });

    // Update object state by making a copy rather than mutating the state
    const toggleColor = (gender) => {
        setActiveIndex(prevState => {
            const nextState = {}
            Object.keys(prevState).forEach(key => {
                if (key==gender) {
                    nextState[key] = true
                } else {
                    nextState[key] = false
                }
            })
            return nextState
        })
    };

    // Extract gender
    useEffect(() => {
       props.setUserData(prevState => {
        return({...prevState, attributes: {...prevState.attributes, gender: Object.keys(activeIndex).find(key => activeIndex[key] === true)}})
       }) 
    }, [activeIndex]);

    return(
        <View style={styles.container}>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, { backgroundColor: activeIndex['Male']? 'white': null, borderColor: activeIndex['Male']? '': '#979797', borderWidth: activeIndex['Male']? 0: 1 }]}
                 onPress={() => toggleColor('Male')}>
                    <Ionicons 
                     name='male-outline'
                     size={50}
                     color={ activeIndex['Male']? 'black': null }/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[{fontWeight: activeIndex['Male']? 'bold': 'normal', color: activeIndex['Male']? 'white': '#ffffff87'}]}>Man</Text>
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, { backgroundColor: activeIndex['Female']? 'white': null, borderColor: activeIndex['Female']? '': '#979797', borderWidth: activeIndex['Female']? 0: 1 }]}
                 onPress={() => toggleColor('Female')}>
                    <Ionicons 
                     name='female-outline'
                     size={50}
                     color={ activeIndex['Female']? 'black': null }/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[{fontWeight: activeIndex['Female']? 'bold': 'normal', color: activeIndex['Female']? 'white': '#ffffff87' }]}>Woman</Text>
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, { backgroundColor: activeIndex['Other']? 'white': null, borderColor: activeIndex['Other']? '': '#979797', borderWidth: activeIndex['Other']? 0: 1 }]}
                 onPress={() => toggleColor('Other')}>
                    <Ionicons 
                     name='male-female-outline'
                     size={50}
                     color={ activeIndex['Other']? 'black': null }/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[{fontWeight: activeIndex['Other']? 'bold': 'normal', color: activeIndex['Other']? 'white': '#ffffff87' }]}>Other</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonConatainer : {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        height: 100,
        width: 100,
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        paddingTop: 10
    },
    image: {
        height: 50,
        width: 50
    }
});

export default GenderList;