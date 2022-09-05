import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ageList = () => {
    // states
    const [color1, setColor1] = useState(false)
    const [color2, setColor2] = useState(false)
    const [color3, setColor3] = useState(false)
    const [color4, setColor4] = useState(false)
    const [color5, setColor5] = useState(false)
    const [color6, setColor6] = useState(false)

    // states list
    const setList = [setColor1, setColor2, setColor3, setColor4, setColor5, setColor6]

    const toggle = (id, colorNum) => {
        
        const newId = id-1

        for (let i=0; i<6; i++) {
            if (i != newId) {
                let set = setList[i]
                set(false)
            }
        };

        const newSet = setList[newId]
        newSet(!colorNum)
    };

    return(
        <View style={ageListStyle().container}>
            <View style={ageListStyle().sections}>
                <View style={ageListStyle().buttonContainer}>
                    <TouchableOpacity
                     style={[ageListStyle().button, ageListStyle(color1).toggleStyle]}
                     onPress={() => toggle(1, color1)}>
                        <Text style={ageListStyle().text}>13 - 18</Text>
                    </TouchableOpacity>
                </View>
            <View style={ageListStyle().buttonContainer}>
                <TouchableOpacity 
                 style={[ageListStyle().button, ageListStyle(color2).toggleStyle]}
                 onPress={() => toggle(2, color2)}>
                    <Text style={ageListStyle().text}>19 - 25</Text>
                </TouchableOpacity>
            </View>
            <View style={ageListStyle().buttonContainer}>
                    <TouchableOpacity 
                    style={[ageListStyle().button, ageListStyle(color3).toggleStyle]}
                    onPress={() => toggle(3, color3)}>
                        <Text style={ageListStyle().text}>26 - 35</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[ageListStyle().sections]}>
                <View style={ageListStyle().buttonContainer}>
                    <TouchableOpacity 
                    style={[ageListStyle().button, ageListStyle(color4).toggleStyle]}
                    onPress={() => toggle(4, color4)}>
                        <Text style={ageListStyle().text}>36 - 45</Text>
                    </TouchableOpacity>
                </View>
                <View style={ageListStyle().buttonContainer}>
                    <TouchableOpacity 
                        style={[ageListStyle().button, ageListStyle(color5).toggleStyle]}
                        onPress={() => toggle(5, color5)}>
                        <Text style={ageListStyle().text}>45 - 49</Text>
                    </TouchableOpacity>
                </View>
                <View style={ageListStyle().buttonContainer}>
                    <TouchableOpacity 
                        style={[ageListStyle().button, ageListStyle(color6).toggleStyle]}
                        onPress={() => toggle(6, color6)}>
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
        backgroundColor: color? '#E84A4A': '#00000000', 
        borderColor: color? '#00000000': '#ffffff50'
    }
});

export default ageList;