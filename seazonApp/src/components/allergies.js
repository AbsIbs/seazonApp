import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Allergies = (props) => {

    // states
    const [activeIndex, setActiveIndex] = useState({
        'dairy': false,
        'nuts': false,
        'gluten': false
    });

    // Update object state by making a copy rather than mutating the state
    const toggleColor = (allergy) => {
        setActiveIndex(prevState => {
            return({...prevState, [allergy]: !activeIndex[allergy]})
        })
    };

    // Extract allergy
    useEffect(()=> {
        props.setUserData(prevState => {
            return({...prevState, allergies: Object.keys(activeIndex).filter(key => activeIndex[key] === true).map(key => key)})
        })
    }, [activeIndex]);

    return(
        <View style={styles.container}>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: activeIndex['dairy']? '#E84A4A': '#979797', borderWidth: activeIndex['dairy']? 4: 2}]}
                 onPress={() => toggleColor('dairy')}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/dairy.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[{color: activeIndex['dairy']? '#E84A4A': ''}, {color: activeIndex['dairy']? '#E84A4A': '#ffffff87'}]}>Dairy</Text>
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: activeIndex['nuts']? '#E84A4A': '#979797', borderWidth: activeIndex['nuts']? 4: 2}]}
                 onPress={() => toggleColor('nuts')}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/nuts.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[{color: activeIndex['nuts']? '#E84A4A': ''}, {color: activeIndex['nuts']? '#E84A4A': '#ffffff87'}]}>Nuts</Text>
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <TouchableOpacity
                 style={[styles.button, {borderColor: activeIndex['gluten']? '#E84A4A': '#979797', borderWidth: activeIndex['gluten']? 4: 2}]}
                 onPress={() => toggleColor('gluten')}>
                    <Image
                     style={styles.image} 
                     source={require('../../assets/img/gluten.png')}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[{color: activeIndex['gluten']? '#E84A4A': ''}, {color: activeIndex['gluten']? '#E84A4A': '#ffffff87'}]}>Gluten</Text>
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
    image: {
        height: 50,
        width: 50
    }
});

export default Allergies;