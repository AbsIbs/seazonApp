import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

// Components
import SignUpBanner from "../components/signUpBanner";
import pleaseNote from "../components/pleaseNote";
import signUpNextButton from "../components/signUpNextButton";
import globalStyle from "../utils/globalStyle";
import interest from "../components/interest";
import dietGoals from "../components/dietGoals";
import lifestyle from "../components/lifestyle";

const message = 'Please note that we will NOT be sharing this with other users'

const SignUpPage4 = ({ navigation }) => {

    return(
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={globalStyle.signUpContainer}>
                {SignUpBanner('Where do your interests lie?', navigation, 68)}
                <View style={styles().contentContainer}>
                    <View style={styles().container}>
                        {pleaseNote(message)}
                    </View>
                    <View style={styles().container}>
                        <Text style={styles().title}>What are your interests?</Text>
                    </View>
                    <View style={styles().container}>
                        {interest('Viewing/sharing culinary creations')}
                    </View>
                    <View style={styles().container}>
                        {interest('Gaining inspiration in the kitchen')}
                    </View>
                    <View style={styles().container}>
                        {interest('Experimneting with recipes')}
                    </View>
                    <View style={styles().container}>
                        <Text style={styles().title}>What are your main goals?</Text>
                    </View>
                    <View style={styles().container}>
                        {dietGoals()}
                    </View>
                    <View style={styles().container}>
                        <Text style={styles().title}>How is your lifestyle?</Text>
                    </View>
                    <View style={styles().container}>
                        {lifestyle()}
                    </View>
                    <View style={{paddingTop: 20}}>
                        {signUpNextButton(navigation, 'Sign Up Page 5')}
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
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16
    },
});

export default SignUpPage4;