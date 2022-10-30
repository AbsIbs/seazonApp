import React, {useState} from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const goals = (text) => {

    const [color, setColor] = useState(false)

    const toggle = () => {
        setColor(!color)
    }

    return(
        <TouchableOpacity 
         style={styles(color).container}
         onPress={() => toggle()}>
            <Text style={styles(color).text}>{text}</Text>
        </TouchableOpacity>
    )
};

const styles = (color) => StyleSheet.create({
    container: {
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
        color: color? '#000000': '#ffffff',
        fontSize: 12
    }
});

export default goals;