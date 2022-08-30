import React, {useState} from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const dietGoals = () => {

    const [color0, setColor0] = useState(false);
    const [color1, setColor1] = useState(false);
    const [color2, setColor2] = useState(false);

    const colorList = [setColor0, setColor1, setColor2];

    const toggleColor = (id, color) => {
        for (let i = 0; i < 3; i++) {
            if (id != i) {
                colorList[i](false)
            }
        };
        colorList[id](!color)
    };

    return(
        <View style={style().container}>
            <View style={style().buttonContainer}>
                <TouchableOpacity 
                style={style(color0).button}
                onPress={() => toggleColor(0, color0)}>
                    <Text style={style(color0).text}>I want to lose fat</Text>
                </TouchableOpacity>
            </View>
            <View style={style().buttonContainer}>
                <TouchableOpacity 
                style={style(color1).button}
                onPress={() => toggleColor(1, color1)}>
                    <Text style={style(color1).text}>I want to maintain my weight</Text>
                </TouchableOpacity>
            </View>
            <View style={style().buttonContainer}>
                <TouchableOpacity 
                style={style(color2).button}
                onPress={() => toggleColor(2, color2)}>
                    <Text style={style(color2).text}>I want to gain muscle</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const style = (color) => StyleSheet.create({
    container: {
        height: 180
    },
    buttonContainer: {
        flex: 1
    },
    button: {
        width: '100%',
        height: 45,
        borderRadius: 23,
        justifyContent: 'center',
        paddingLeft: 20,
        borderColor: '#ffffff50',
        borderWidth: color? 0: 1,
        backgroundColor: color? '#ffffff': '#00000000'
    },
    text: {
        fontSize: 12,
        color: color? '#000000': '#ffffff'
    }
});

export default dietGoals;