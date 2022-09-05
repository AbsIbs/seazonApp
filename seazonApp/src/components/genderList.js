import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const genderList = () => {

    const [color0, setColor0] = useState(false)
    const [color1, setColor1] = useState(false)
    const [color2, setColor2] = useState(false)

    const colorList = [color0, color1, color2]
    const setColorList = [setColor0, setColor1, setColor2]

    const toggleColor = (index) => {

        const indexState = setColorList[index]

        for (let i = 0; i < 3; i++) {
            if (colorList[i] != false && i[setColorList] != indexState) {
                setColorList[i](false)
            }
        };
        indexState(!colorList[index])
    }

    return(
        <View style={styles.container}>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: color0? '#E84A4A': '#979797', borderWidth: color0? 4: 2}]}
                 onPress={() => toggleColor(0)}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/man.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {color: color0? '#E84A4A': '#ffffff87'}]}>Man</Text>
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: color1? '#E84A4A': '#979797', borderWidth: color1? 4: 2}]}
                 onPress={() => toggleColor(1)}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/woman.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {color: color1? '#E84A4A': '#ffffff87'}]}>Woman</Text>
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: color2? '#E84A4A': '#979797', borderWidth: color2? 4: 2}]}
                 onPress={() => toggleColor(2)}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/other.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {color: color2? '#E84A4A': '#ffffff87'}]}>Other</Text>
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
        borderRadius: 55,
        backgroundColor: '#272727',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        paddingTop: 10
    },
    text: {
        fontWeight: 'bold'
    },
    image: {
        height: 50,
        width: 50
    }
});

export default genderList;