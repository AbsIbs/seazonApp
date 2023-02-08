import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RecipeMealType = () => {

    const [breakfast, setBreakfast] = useState(false)
    const [lunch, setLunch] = useState(false)
    const [dinner, setDinner] = useState(false)
    const [dessert, setDessert] = useState(false)
    const [beverages, setBeverages] = useState(false)
    const [soups, setSoups] = useState(false)

    const mealTypeList = [
        {'setFunction': setBreakfast, 'setValue': breakfast},
        {'setFunction': setLunch, 'setValue': lunch},
        {'setFunction': setDinner, 'setValue': dinner},
        {'setFunction': setDessert, 'setValue': dessert},
        {'setFunction': setBeverages, 'setValue': beverages},
        {'setFunction': setSoups, 'setValue': soups}
    ]

    const toggleColor = (index) => {
        for (let i=0; i < mealTypeList.length; i++) {
            mealTypeList[i]['setFunction'](false)
        }
        const mealtype = mealTypeList[index]
        const setFunction = mealtype['setFunction']
        const setValue = mealtype['setValue']
        setFunction(!setValue);
    };
    
    return(
        <View style={styles().outerContainer}>
            <View style={styles().innerContainer}>
                <View style={styles().mealTypeContainer}>
                    <TouchableOpacity 
                    style={styles(breakfast).mealType}
                    onPress={() => toggleColor(0)}>
                        <Text style={styles(breakfast).mealTypeLabel}>Breakfast</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().mealTypeContainer}>             
                    <TouchableOpacity 
                    style={styles(lunch).mealType}
                    onPress={() => toggleColor(1)}>
                        <Text style={styles(lunch).mealTypeLabel}>Lunch</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().mealTypeContainer}>
                    <TouchableOpacity 
                    style={styles(dinner).mealType}
                    onPress={() => toggleColor(2)}>
                        <Text style={styles(dinner).mealTypeLabel}>Dinner</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles().innerContainer, {paddingTop: 10}]}>
                <View style={styles().mealTypeContainer}>
                    <TouchableOpacity 
                    style={styles(dessert).mealType}
                    onPress={() => toggleColor(3)}>
                        <Text style={styles(dessert).mealTypeLabel}>Dessert</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().mealTypeContainer}>             
                    <TouchableOpacity 
                    style={styles(beverages).mealType}
                    onPress={() => toggleColor(4)}>
                        <Text style={styles(beverages).mealTypeLabel}>Beverages</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().mealTypeContainer}>
                    <TouchableOpacity 
                    style={styles(soups).mealType}
                    onPress={() => toggleColor(5)}>
                        <Text style={styles(soups).mealTypeLabel}>Soups</Text>
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
        borderWidth: state == true? 0: 1,
        borderColor: '#2B303C',
        backgroundColor: state == true? '#ffffff': '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius: 4
    },
    mealTypeLabel: {
        color: state == true? '#000000': '#ffffff',
        fontSize: 12
    }
});

export default RecipeMealType;