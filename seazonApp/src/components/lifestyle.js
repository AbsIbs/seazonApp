import React, {useState} from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const lifestyle = () => {

    const [min, setMin] = useState(false)
    const [mid, setMid] = useState(false)
    const [max, setMax] = useState(false)

    const skillList = [setMin, setMid, setMax]

    const toggle = (num, difficulty) => {
        for (let i=0; i<3; i++) {
            let set = skillList[i]
            set(false)
        }
        skillList[num](!difficulty)
    };

    return(
        <View style={styles().container}>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(min).button}
                onPress={() => toggle(0, min)}>
                    <View style={styles().textContainer}>
                        <Text style={styles(min).title}>I'm not active</Text>
                        <Text style={styles(min).desc}>You don't exercise</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(mid).button}
                onPress={() => toggle(1, mid)}>
                    <View style={styles().textContainer}>
                        <Text style={styles(mid).title}>I'm moderately active</Text>
                        <Text style={styles(mid).desc}>You exercise once or twice a week</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(max).button}
                onPress={() => toggle(2, max)}>
                    <View style={styles().textContainer}>
                        <Text style={styles(max).title}>I'm highly active</Text>
                        <Text style={styles(max).desc}>You exercise 3 or more times per week</Text>
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

export default lifestyle;