import React, {useState} from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const cookingLevelList = () => {

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

    const tintToggle = (difficulty) => {
        return(
            difficulty? '#000000': '#ffffff50'
        )
    }; 

    return(
        <View style={styles().container}>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(min).button}
                onPress={() => toggle(0, min)}>
                    <View style={styles().textContainer}>
                        <Text style={styles(min).title}>Beginner</Text>
                        <Text style={styles(min).desc}>"I'm cooking just to get by"</Text>
                    </View>
                    <View style={styles().imageContainer}>
                        <Image
                         tintColor = {tintToggle(min)}
                         style={styles().image}
                         source={require('../../assets/img/lowLevel.png')} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(mid).button}
                onPress={() => toggle(1, mid)}>
                    <View style={styles().textContainer}>
                        <Text style={styles(mid).title}>Intermediate</Text>
                        <Text style={styles(mid).desc}>"I like experiencing with recipes"</Text>
                    </View>
                    <View style={styles().imageContainer}>
                        <Image
                         tintColor = {tintToggle(mid)}
                         style={styles().image}
                         source={require('../../assets/img/midLevel.png')} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(max).button}
                onPress={() => toggle(2, max)}>
                    <View style={styles().textContainer}>
                        <Text style={styles(max).title}>Advanced</Text>
                        <Text style={styles(max).desc}>"Self-proclaimed master chef"</Text>
                    </View>
                    <View style={styles().imageContainer}>
                        <Image
                         style={styles().image}
                         tintColor={tintToggle(max)}
                         source={require('../../assets/img/maxLevel.png')} />
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

export default cookingLevelList;