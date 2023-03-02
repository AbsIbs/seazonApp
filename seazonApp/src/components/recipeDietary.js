import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AddRecipeContext } from "../../Global/AddRecipeContext";

const RecipeDietary = () => {

    const { setRecipe, errorRecipe } = useContext(AddRecipeContext)

    const [activeIndex, setActiveIndex] = useState({
        'Vegan': false,
        'Vegetarian': false,
        'Pescatarian': false,
        'Nut-Free': false,
        'Gluten-Free': false,
        'Dairy-Free': false,
        'High Protein': false,
        'Low Carb': false,
        'High Fat': false
    });

    // Update object state by making a copy rather than mutating the state
    const toggleColor = (dietary) => {
        setActiveIndex(prevState => {
            return ({ ...prevState, [dietary]: !activeIndex[dietary] })
        })
    };


    useEffect(() => {
        setRecipe(prevState => {
            return ({ ...prevState, dietary: Object.keys(activeIndex).filter(key => activeIndex[key] === true).map(key => key) })
        })
    }, [activeIndex])

    return (
        <View style={styles().outerContainer}>
            <View style={styles().innerContainer}>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity
                        style={[styles(activeIndex['Vegan']).dietary]}
                        onPress={() => toggleColor('Vegan')}>
                        <Text style={styles(activeIndex['Vegan']).dietaryType}>Vegan</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity
                        style={[styles(activeIndex['Vegetarian']).dietary]}
                        onPress={() => toggleColor('Vegetarian')}>
                        <Text style={styles(activeIndex['Vegetarian']).dietaryType}>Vegetarian</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity
                        style={[styles(activeIndex['Pescatarian']).dietary]}
                        onPress={() => toggleColor('Pescatarian')}>
                        <Text style={styles(activeIndex['Pescatarian']).dietaryType}>Pescatarian</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles().innerContainer, { paddingTop: 10 }]}>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity
                        style={[styles(activeIndex['Nut-Free']).dietary]}
                        onPress={() => toggleColor('Nut-Free')}>
                        <Text style={styles(activeIndex['Nut-Free']).dietaryType}>Nut-Free</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity
                        style={[styles(activeIndex['Gluten-Free']).dietary]}
                        onPress={() => toggleColor('Gluten-Free')}>
                        <Text style={styles(activeIndex['Gluten-Free']).dietaryType}>Gluten-Free</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity
                        style={[styles(activeIndex['Dairy-Free']).dietary]}
                        onPress={() => toggleColor('Dairy-Free')}>
                        <Text style={styles(activeIndex['Dairy-Free']).dietaryType}>Dairy-Free</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles().innerContainer, { paddingTop: 10 }]}>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity
                        style={[styles(activeIndex['High Protein']).dietary]}
                        onPress={() => toggleColor('High Protein')}>
                        <Text style={styles(activeIndex['High Protein']).dietaryType}>High Protein</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity
                        style={[styles(activeIndex['Low Carb']).dietary]}
                        onPress={() => toggleColor('Low Carb')}>
                        <Text style={styles(activeIndex['Low Carb']).dietaryType}>Low Carb</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity
                        style={[styles(activeIndex['High Fat']).dietary]}
                        onPress={() => toggleColor('High Fat')}>
                        <Text style={styles(activeIndex['High Fat']).dietaryType}>High Fat</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = (state) => StyleSheet.create({
    outerContainer: {
        alignItems: 'center'
    },
    innerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    dietaryContainer: {
        flex: 1,
        alignItems: 'center'
    },
    dietary: {
        width: '95%',
        borderColor: state == true? '': '#2B303C',
        borderWidth: state == true ? 0 : 1,
        backgroundColor: state == true ? '#ffffff' : '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        borderRadius: 4
    },
    dietaryType: {
        color: state == true ? '#000000' : '#ffffff',
        fontSize: 12
    }
});

export default RecipeDietary;