import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const recipeDietary = () => {

    const [vegan, setVegan] = useState(false)
    const [vegetarian, setVegetarian] = useState(false)
    const [pescatarian, setPescatarian] = useState(false)
    const [nutFree, setNutFree] = useState(false)
    const [glutenFree, setGlutenFree] = useState(false)
    const [dairyFree, setDairyFree] = useState(false)
    const [highProtein, setHighProtein] = useState(false)
    const [lowCarb, setLowCarb] = useState(false)
    const [highFat, setHighFat] = useState(false)
    

    const dietaryList = [
        {'setFunction': setVegan, 'setValue': vegan},
        {'setFunction': setVegetarian, 'setValue': vegetarian},
        {'setFunction': setPescatarian, 'setValue': pescatarian},
        {'setFunction': setNutFree, 'setValue': nutFree},
        {'setFunction': setGlutenFree, 'setValue': glutenFree},
        {'setFunction': setDairyFree, 'setValue': dairyFree},
        {'setFunction': setHighProtein, 'setValue': highProtein},
        {'setFunction': setLowCarb, 'setValue': lowCarb},
        {'setFunction': setHighFat, 'setValue': highFat}
    ]

    const toggleColor = (index) => {
        const dietaryType = dietaryList[index]
        const setFunction = dietaryType['setFunction']
        const setValue = dietaryType['setValue']
        setFunction(!setValue);
    };
    
    return(
        <View style={styles().outerContainer}>
            <View style={styles().innerContainer}>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity 
                    style={styles(vegan).dietary}
                    onPress={() => toggleColor(0)}>
                        <Text style={styles(vegan).dietaryType}>Vegan</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>             
                    <TouchableOpacity 
                    style={styles(vegetarian).dietary}
                    onPress={() => toggleColor(1)}>
                        <Text style={styles(vegetarian).dietaryType}>Vegetarian</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity 
                    style={styles(pescatarian).dietary}
                    onPress={() => toggleColor(2)}>
                        <Text style={styles(pescatarian).dietaryType}>Pescatarian</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles().innerContainer, {paddingTop: 10}]}>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity 
                    style={styles(nutFree).dietary}
                    onPress={() => toggleColor(3)}>
                        <Text style={styles(nutFree).dietaryType}>Nut-Free</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>             
                    <TouchableOpacity 
                    style={styles(glutenFree).dietary}
                    onPress={() => toggleColor(4)}>
                        <Text style={styles(glutenFree).dietaryType}>Gluten-Free</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity 
                    style={styles(dairyFree).dietary}
                    onPress={() => toggleColor(5)}>
                        <Text style={styles(dairyFree).dietaryType}>Dairy-Free</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles().innerContainer, {paddingTop: 10}]}>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity 
                    style={styles(highProtein).dietary}
                    onPress={() => toggleColor(6)}>
                        <Text style={styles(highProtein).dietaryType}>High Protein</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>             
                    <TouchableOpacity 
                    style={styles(lowCarb).dietary}
                    onPress={() => toggleColor(7)}>
                        <Text style={styles(lowCarb).dietaryType}>Low Carb</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles().dietaryContainer}>
                    <TouchableOpacity 
                    style={styles(highFat).dietary}
                    onPress={() => toggleColor(8)}>
                        <Text style={styles(highFat).dietaryType}>High Fat</Text>
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
        borderWidth: state == true? 0: 1,
        borderColor: '#2B303C',
        backgroundColor: state == true? '#ffffff': '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius: 4
    },
    dietaryType: {
        color: state == true? '#000000': '#ffffff',
        fontSize: 12
    }
});

export default recipeDietary;