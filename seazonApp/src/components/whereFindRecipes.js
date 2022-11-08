import React, {useState, useEffect} from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const WhereFindRecipes = (props) => {

    // States
    const [activeIndex, setActiveIndex] = useState({
        'Recipe Apps': false,
        'Online blogs/websites': false,
        'YouTube': false,
        'TikTok': false,
        'Family and friends': false,
        'Learn how to cook': false
    });

    // Update object state
    const toggleColor = (text) => {
        setActiveIndex(prevState => {
            return({...prevState, [text]: !activeIndex[text]})
        })
    };
    
    useEffect(()=> {
        props.setUserData(prevState => {
            return({...prevState, attributes: {...prevState.attributes, findRecipes: Object.keys(activeIndex).filter(key => activeIndex[key] === true).map(key => key)}})
        })
    }, [activeIndex])

    return(
        <View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['Recipe Apps']).button}
                onPress={() => toggleColor('Recipe Apps')}>
                    <Text style={styles(activeIndex['Recipe Apps']).text}>Recipe Apps</Text>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['Online blogs/websites']).button}
                onPress={() => toggleColor('Online blogs/websites')}>
                    <Text style={styles(activeIndex['Online blogs/websites']).text}>Onlne blogs/websites</Text>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['YouTube']).button}
                onPress={() => toggleColor('YouTube')}>
                    <Text style={styles(activeIndex['YouTube']).text}>YouTube</Text>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['TikTok']).button}
                onPress={() => toggleColor('TikTok')}>
                    <Text style={styles(activeIndex['TikTok']).text}>TikTok</Text>
                </TouchableOpacity>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity 
                style={styles(activeIndex['Family and friends']).button}
                onPress={() => toggleColor('Family and friends')}>
                    <Text style={styles(activeIndex['Family and friends']).text}>Family and friends</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = (color) => StyleSheet.create({
    buttonContainer: {
        paddingVertical: 10
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 25,
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

export default WhereFindRecipes;