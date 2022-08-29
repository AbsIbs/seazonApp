import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const genderList = () => {

    const [color1, setColor1] = useState(false)
    const [color2, setColor2] = useState(false)
    const [color3, setColor3] = useState(false)

    const toggleColor1 = () => {
        setColor1(!color1)
        setColor2(false)
        setColor3(false)
        }

    const toggleColor2 = () => {
        setColor1(false)
        setColor2(!color2)
        setColor3(false)
        }

    const toggleColor3 = () => {
        setColor1(false)
        setColor2(false)
        setColor3(!color3)
        }

    return(
        <View style={styles.container}>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: color1? '#E84A4A': '#979797', borderWidth: color1? 4: 2}]}
                 onPress={() => toggleColor1()}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/man.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {color: color1? '#E84A4A': '#ffffff87'}]}>Man</Text>
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: color2? '#E84A4A': '#979797', borderWidth: color2? 4: 2}]}
                 onPress={() => toggleColor2()}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/woman.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {color: color2? '#E84A4A': '#ffffff87'}]}>Woman</Text>
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: color3? '#E84A4A': '#979797', borderWidth: color3? 4: 2}]}
                 onPress={() => toggleColor3()}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/other.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {color: color3? '#E84A4A': '#ffffff87'}]}>Other</Text>
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
        height: 110,
        width: 110,
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
        height: 60,
        width: 60
    }
});

export default genderList;