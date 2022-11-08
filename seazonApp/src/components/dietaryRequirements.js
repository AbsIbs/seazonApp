import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const DietaryRequirements = (props) => {

    // states
    const [activeIndex, setActiveIndex] = useState({
        'vegetarian': false,
        'vegan': false,
        'pescatarian': false,
        'halal': false,
        'kosher': false
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
            return({...prevState, attributes: {...prevState.attributes, dietaryRequirements: Object.keys(activeIndex).filter(key => activeIndex[key] === true).map(key => key)}})
        })
    }, [activeIndex]);

    return(
        <View>
            <View style={styles.container}>
                <View style={styles.buttonConatainer}>
                    <TouchableOpacity
                    style={[styles.button, {borderColor: activeIndex['vegetarian']? '#E84A4A': '#979797', borderWidth: activeIndex['vegetarian']? 4: 2}]}
                    onPress={() => toggleColor('vegetarian')}>
                        <Image
                        style={styles.image} 
                        source={require('../../assets/img/vegetarian.png')}/>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={[{color: activeIndex['vegetarian']? '#E84A4A': ''}, {color: activeIndex['vegetarian']? '#E84A4A': '#ffffff87'}]}>Vegetarian</Text>
                    </View>
                </View>
                <View style={styles.buttonConatainer}>
                    <TouchableOpacity
                    style={[styles.button, {borderColor: activeIndex['vegan']? '#E84A4A': '#979797', borderWidth: activeIndex['vegan']? 4: 2}]}
                    onPress={() => toggleColor('vegan')}>
                        <Image
                        style={styles.image} 
                        source={require('../../assets/img/vegan.png')}/>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={[{color: activeIndex['vegan']? '#E84A4A': ''}, {color: activeIndex['vegan']? '#E84A4A': '#ffffff87'}]}>Vegan</Text>
                    </View>
                </View>
                <View style={styles.buttonConatainer}>
                    <TouchableOpacity
                    style={[styles.button, {borderColor: activeIndex['pescatarian']? '#E84A4A': '#979797', borderWidth: activeIndex['pescatarian']? 4: 2}]}
                    onPress={() => toggleColor('pescatarian')}>
                        <Image
                        style={styles.image} 
                        source={require('../../assets/img/pescatarian.png')}/>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={[{color: activeIndex['pescatarian']? '#E84A4A': ''}, {color: activeIndex['pescatarian']? '#E84A4A': '#ffffff87'}]}>Pescatarian</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.container, {paddingTop: 10}]}>
                <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
                    <View style={styles.buttonConatainer}>
                        <TouchableOpacity
                        style={[styles.button, {borderColor: activeIndex['halal']? '#E84A4A': '#979797', borderWidth: activeIndex['halal']? 4: 2}]}
                        onPress={() => toggleColor('halal')}>
                            <Image
                            style={styles.image} 
                            source={require('../../assets/img/halal.png')}/>
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={[{color: activeIndex['halal']? '#E84A4A': ''}, {color: activeIndex['halal']? '#E84A4A': '#ffffff87'}]}>Halal</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 10}}>
                    <View style={styles.buttonConatainer}>
                        <TouchableOpacity
                            style={[styles.button, {borderColor: activeIndex['kosher']? '#E84A4A': '#979797', borderWidth: activeIndex['kosher']? 4: 2}]}
                            onPress={() => toggleColor('kosher')}>
                            <Image
                            style={styles.image} 
                            source={require('../../assets/img/kosher.png')}/>
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                            <Text style={[{color: activeIndex['kosher']? '#E84A4A': ''}, {color: activeIndex['kosher']? '#E84A4A': '#ffffff87'}]}>Kosher</Text>
                        </View>
                    </View>
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

export default DietaryRequirements;