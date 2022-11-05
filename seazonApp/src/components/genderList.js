import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const GenderList = (props) => {

    const [activeIndex, setActiveIndex] = useState({
        'Male': false,
        'Female': false,
        'Other': false
    });

    const toggleColor = (gender) => {
        for (const key in activeIndex) {
            activeIndex[key] = false;
        };
        setActiveIndex({...activeIndex, [gender]: true})
    };

    useEffect(() => {
        for (const key in activeIndex){
            if (activeIndex[key] == true) {
                props.setUserData({...props.userData, attributes: {...props.userData.attributes, gender: key}})
            }
        }
    }, [activeIndex]); 

    return(
        <View style={styles.container}>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: activeIndex['Male']? '#E84A4A': '#979797', borderWidth: activeIndex['Male']? 4: 2}]}
                 onPress={() => toggleColor('Male')}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/man.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {color: activeIndex['Male']? '#E84A4A': '#ffffff87'}]}>Man</Text>
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: activeIndex['Female']? '#E84A4A': '#979797', borderWidth: activeIndex['Female']? 4: 2}]}
                 onPress={() => toggleColor('Female')}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/woman.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {color: activeIndex['Female']? '#E84A4A': '#ffffff87'}]}>Woman</Text>
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: activeIndex['Other']? '#E84A4A': '#979797', borderWidth: activeIndex['Other']? 4: 2}]}
                 onPress={() => toggleColor('Other')}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/other.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {color: activeIndex['Other']? '#E84A4A': '#ffffff87'}]}>Other</Text>
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

export default GenderList;