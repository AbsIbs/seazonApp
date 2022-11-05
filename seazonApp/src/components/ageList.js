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
                if (key==age) {
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
            return({...prevState, attributes: {...prevState.attributes, age: Object.keys(activeIndex).find(key => activeIndex[key] === true)}})
        }) 
        }, [activeIndex]);

    return(
        <View style={ageListStyle().container}>
            <View style={ageListStyle().sections}>
                <View style={ageListStyle().buttonContainer}>
                    <TouchableOpacity
                     style={[ageListStyle().button, {backgroundColor: activeIndex['13-18']? '#E84A4A': '#00000000', borderColor: activeIndex['13-18']? '#00000000': '#ffffff50'}]}
                     onPress={() => toggle('13-18')}>
                        <Text style={ageListStyle().text}>13 - 18</Text>
                    </TouchableOpacity>
                </View>
            <View style={ageListStyle().buttonContainer}>
                <TouchableOpacity 
                 style={[ageListStyle().button, {backgroundColor: activeIndex['19-25']? '#E84A4A': '#00000000', borderColor: activeIndex['19-25']? '#00000000': '#ffffff50'}]}
                 onPress={() => toggle('19-25')}>
                    <Text style={ageListStyle().text}>19 - 25</Text>
                </TouchableOpacity>
            </View>
            <View style={ageListStyle().buttonContainer}>
                    <TouchableOpacity 
                    style={[ageListStyle().button, {backgroundColor: activeIndex['26-35']? '#E84A4A': '#00000000', borderColor: activeIndex['26-35']? '#00000000': '#ffffff50'}]}
                    onPress={() => toggle('26-35')}>
                        <Text style={ageListStyle().text}>26 - 35</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[ageListStyle().sections]}>
                <View style={ageListStyle().buttonContainer}>
                    <TouchableOpacity 
                    style={[ageListStyle().button, {backgroundColor: activeIndex['36-45']? '#E84A4A': '#00000000', borderColor: activeIndex['36-45']? '#00000000': '#ffffff50'}]}
                    onPress={() => toggle('36-45')}>
                        <Text style={ageListStyle().text}>36 - 45</Text>
                    </TouchableOpacity>
                </View>
                <View style={ageListStyle().buttonContainer}>
                    <TouchableOpacity 
                        style={[ageListStyle().button, {backgroundColor: activeIndex['45-49']? '#E84A4A': '#00000000', borderColor: activeIndex['45-49']? '#00000000': '#ffffff50'}]}
                        onPress={() => toggle('45-49')}>
                        <Text style={ageListStyle().text}>45 - 49</Text>
                    </TouchableOpacity>
                </View>
                <View style={ageListStyle().buttonContainer}>
                    <TouchableOpacity 
                        style={[ageListStyle().button, {backgroundColor: activeIndex['50+']? '#E84A4A': '#00000000', borderColor: activeIndex['50+']? '#00000000': '#ffffff50'}]}
                        onPress={() => toggle('50+')}>
                        <Text style={ageListStyle().text}>50+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const ageListStyle = (color) => StyleSheet.create({
    container: {
        height: 100,
        paddingTop: 10
    },
    sections: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    button: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: 100,
        borderRadius: 55
    },
    text: {
        color: '#ffffff',
        fontSize: 12
    },
    toggleStyle: {
        backgroundColor: color? '#E84A4A': '#00000000', borderColor: color? '#00000000': '#ffffff50'
    }
});

export default AgeList;