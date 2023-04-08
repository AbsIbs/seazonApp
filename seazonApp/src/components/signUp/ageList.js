import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AgeList = (props) => {

    // Age list state object
    const [activeIndex, setActiveIndex] = useState({
        '13-18': false,
        '19-25': false,
        '26-35': false,
        '36-45': false,
        '45-49': false,
        '50+': false
    })

    const toggle = (age) => {
        setActiveIndex(prevState => {
            const nextState = {}
            Object.keys(prevState).forEach(key => {
                if (key == age) {
                    nextState[key] = true
                } else {
                    nextState[key] = false
                }
            })
            return nextState
        })
    };

    // Extract age
    useEffect(() => {
        props.setUserData(prevState => {
            return ({ ...prevState, age: Object.keys(activeIndex).find(key => activeIndex[key] === true) })
        })
    }, [activeIndex]);

    return (
        <View style={ageListStyle().container}>
            <View style={ageListStyle().buttonContainer}>
                <TouchableOpacity
                    style={[ageListStyle().button, { backgroundColor: activeIndex['13-18'] ? 'white' : '#00000000', borderColor: activeIndex['13-18'] ? '#00000000' : '#ffffff50' }]}
                    onPress={() => toggle('13-18')}>
                    <Text style={[{ color: activeIndex['13-18'] ? 'black' : 'white' }, ageListStyle().text]}>13 - 18</Text>
                </TouchableOpacity>
            </View>
            <View style={ageListStyle().buttonContainer}>
                <TouchableOpacity
                    style={[ageListStyle().button, { backgroundColor: activeIndex['19-25'] ? 'white' : '#00000000', borderColor: activeIndex['19-25'] ? '#00000000' : '#ffffff50' }]}
                    onPress={() => toggle('19-25')}>
                    <Text style={[{ color: activeIndex['19-25'] ? 'black' : 'white' }, ageListStyle().text]}>19 - 25</Text>
                </TouchableOpacity>
            </View>
            <View style={ageListStyle().buttonContainer}>
                <TouchableOpacity
                    style={[ageListStyle().button, { backgroundColor: activeIndex['26-35'] ? 'white' : '#00000000', borderColor: activeIndex['26-35'] ? '#00000000' : '#ffffff50' }]}
                    onPress={() => toggle('26-35')}>
                    <Text style={[{ color: activeIndex['26-35'] ? 'black' : 'white' }, ageListStyle().text]}>26 - 35</Text>
                </TouchableOpacity>
            </View>
            <View style={ageListStyle().buttonContainer}>
                <TouchableOpacity
                    style={[ageListStyle().button, { backgroundColor: activeIndex['36-45'] ? 'white' : '#00000000', borderColor: activeIndex['36-45'] ? '#00000000' : '#ffffff50' }]}
                    onPress={() => toggle('36-45')}>
                    <Text style={[{ color: activeIndex['36-45'] ? 'black' : 'white' }, ageListStyle().text]}>36 - 45</Text>
                </TouchableOpacity>
            </View>
            <View style={ageListStyle().buttonContainer}>
                <TouchableOpacity
                    style={[ageListStyle().button, { backgroundColor: activeIndex['45-49'] ? 'white' : '#00000000', borderColor: activeIndex['45-49'] ? '#00000000' : '#ffffff50' }]}
                    onPress={() => toggle('45-49')}>
                    <Text style={[{ color: activeIndex['45-49'] ? 'black' : 'white' }, ageListStyle().text]}>45 - 49</Text>
                </TouchableOpacity>
            </View>
            <View style={ageListStyle().buttonContainer}>
                <TouchableOpacity
                    style={[ageListStyle().button, { backgroundColor: activeIndex['50+'] ? 'white' : '#00000000', borderColor: activeIndex['50+'] ? '#00000000' : '#ffffff50' }]}
                    onPress={() => toggle('50+')}>
                    <Text style={[{ color: activeIndex['50+'] ? 'black' : 'white' }, ageListStyle().text]}>50+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const ageListStyle = (color) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7.5
    },
    button: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 250,
        borderRadius: 55
    },
    text: {
        fontSize: 12,
        fontWeight: '500'
    },
    toggleStyle: {
        backgroundColor: color ? '#E84A4A' : '#00000000', borderColor: color ? '#00000000' : '#ffffff50'
    }
});

export default AgeList;