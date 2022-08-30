import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import globalStyle from "../utils/globalStyle";


// Components
import SignUpBanner from "../components/signUpBanner";
import highlightCircle from "../components/highlightCircle";
import signUpNextButton from "../components/signUpNextButton";

const SignUpPage5 = ({ navigation }) => {

    // images
    const dairy = require('../../assets/img/dairy.png')
    const nuts = require('../../assets/img/nuts.png')
    const gluten = require('../../assets/img/gluten.png')

    const vegetarian = require('../../assets/img/vegetarian.png')
    const vegan = require('../../assets/img/vegan.png')
    const pescatarian = require('../../assets/img/pescatarian.png')

    const halal = require('../../assets/img/halal.png')
    const kosher = require('../../assets/img/kosher.png')
    


    return(
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={globalStyle.signUpContainer}>
                {SignUpBanner('Just one last thing!', navigation)}
                <View style={styles().contentContainer}>
                    <View style={styles().container}>
                        <Text style={styles().title}>Do you have any allergies?</Text>
                    </View>
                    <View style={styles().itemContainer}>
                        <View style={styles().item}>
                            {highlightCircle('Dairy', dairy)}
                        </View>
                        <View style={styles().item}>
                            {highlightCircle('Nuts', nuts)}
                        </View>
                        <View style={styles().item}>
                            {highlightCircle('Gluten', gluten)}
                        </View>
                    </View>
                    <View style={styles().container}>
                        <Text style={styles().title}>Do you have any dietary requirements?</Text>
                    </View>
                    <View>
                        <View style={styles().itemContainer}>
                            <View style={styles().item}>
                                {highlightCircle('Vegetarian', vegetarian)}
                            </View>
                            <View style={styles().item}>
                                {highlightCircle('Vegan', vegan)}
                            </View>
                            <View style={styles().item}>
                                {highlightCircle('Pescatarian', pescatarian)}
                            </View>
                        </View>
                        <View style={styles().dietaryBottom}>
                            <View style={styles().halal}>
                                {highlightCircle('Halal', halal)}
                            </View>
                            <View style={styles().kosher}>
                                {highlightCircle('Kosher', kosher)}
                            </View>
                        </View>
                        <View style={styles().container}>
                            {signUpNextButton(navigation, 'Sign Up Page 5')}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = () => StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '90%'
    },
    container: {
        paddingTop: 20
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    itemContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 20
    },
    item: {
        flex: 1,
        alignItems: 'center'
    },
    dietaryContainer : {
        paddingTop: 20
    },
    dietaryBottom: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    halal: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 10
    },
    kosher: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 10
    }
});

export default SignUpPage5;