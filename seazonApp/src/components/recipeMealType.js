import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RecipeMealType = (props) => {

    const [activeIndex, setActiveIndex] = useState({
        'Breakfast': false,
        'Lunch': false,
        'Dinner': false,
        'Dessert': false,
        'Beverages': false,
        'Soups': false
    });

    // Update object state by making a copy rather than mutating the state
    const toggleColor = (mealType) => {
        setActiveIndex(prevState => {
            const nextState = {}
            Object.keys(prevState).forEach(key => {
                if (key == mealType) {
                    nextState[key] = true
                } else {
                    nextState[key] = false
                }
            })
            return nextState
        })
    };

    // Extract cooking frequency
    useEffect(() => {
        props.setRecipeObject(prevState => {
            return ({ ...prevState, mealType: Object.keys(activeIndex).find(key => activeIndex[key] === true) })
        })
    }, [activeIndex]);

    return (
        <View style={styles().outerContainer}>
            <View style={styles().innerContainer}>
                <View style={styles().mealTypeContainer}>
                    <TouchableOpacity
                        style={styles(activeIndex['Breakfast']).mealType}
                        onPress={() => toggleColor('Breakfast')}>
                        <Text style={styles(activeIndex['Breakfast']).mealTypeLabel}>Breakfast</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().mealTypeContainer}>
                    <TouchableOpacity
                        style={styles(activeIndex['Lunch']).mealType}
                        onPress={() => toggleColor('Lunch')}>
                        <Text style={styles(activeIndex['Lunch']).mealTypeLabel}>Lunch</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().mealTypeContainer}>
                    <TouchableOpacity
                        style={styles(activeIndex['Dinner']).mealType}
                        onPress={() => toggleColor('Dinner')}>
                        <Text style={styles(activeIndex['Dinner']).mealTypeLabel}>Dinner</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles().innerContainer, { paddingTop: 10 }]}>
                <View style={styles().mealTypeContainer}>
                    <TouchableOpacity
                        style={styles(activeIndex['Dessert']).mealType}
                        onPress={() => toggleColor('Dessert')}>
                        <Text style={styles(activeIndex['Dessert']).mealTypeLabel}>Dessert</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().mealTypeContainer}>
                    <TouchableOpacity
                        style={styles(activeIndex['Beverages']).mealType}
                        onPress={() => toggleColor('Beverages')}>
                        <Text style={styles(activeIndex['Beverages']).mealTypeLabel}>Beverages</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().mealTypeContainer}>
                    <TouchableOpacity
                        style={styles(activeIndex['Soups']).mealType}
                        onPress={() => toggleColor('Soups')}>
                        <Text style={styles(activeIndex['Soups']).mealTypeLabel}>Soups</Text>
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
    mealTypeContainer: {
        flex: 1,
        alignItems: 'center'
    },
    mealType: {
        width: '95%',
        borderWidth: state == true ? 0 : 1,
        borderColor: '#2B303C',
        backgroundColor: state == true ? '#ffffff' : '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        borderRadius: 4
    },
    mealTypeLabel: {
        color: state == true ? '#000000' : '#ffffff',
        fontSize: 12
    }
});

export default RecipeMealType;