import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import globalStyle from "../utils/globalStyle";

// components
import SignUpCompleteBanner from "../components/signUpCompleteBanner";

const SignUpComplete = ({navigation}) => {
    return(
        <View style={globalStyle.signUpContainer}>
            {SignUpCompleteBanner()}
            <View style={styles().section}>
                <View style={styles().outerCircle}>
                    <View style={styles().imageContainer}>

                    </View>
                </View>
            </View>
            <View style={styles().section}>
                <Text style={styles().title}>Registration Completed</Text>
            </View>
            <View style={styles().descSection}>
                <Text style={styles().desc}>Your registration process is completed.</Text>
                <Text style={styles().desc}>You can now log into the app.</Text>
            </View>
            <View style={styles().descSection}>
                <Text style={styles().desc}>We've also sent a confirmation email to your address.</Text>
                <Text style={styles().desc}>Please check your inbox.</Text>
            </View>
            <View style={styles().buttonContainer}>
                <TouchableOpacity
                 onPress={() => navigation.navigate('Sign Up Page 1')} 
                 style={styles().button}>
                    <Text style={styles().okay}>Okay!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = () => StyleSheet.create({
    section : {
        padding: 20,
        justifyContent: 'center'
    },
    descSection: {
        paddingTop: 15
    },
    outerCircle: {
        height: 120,
        width: 120,
        borderColor: '#ffffff',
        borderRadius: 60,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 25,
        color: '#ffffff',
        fontWeight: '400'
    },
    desc: {
        fontSize: 12,
        color: '#ffffff',
        textAlign: 'center'
    },
    buttonContainer: {
        paddingTop: 60
    },
    button: {
        width: 160,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E32828',
        borderRadius: 20
    },
    okay: {
        color: '#ffffff',
        fontWeight: 'bold'
    }
});

export default SignUpComplete;