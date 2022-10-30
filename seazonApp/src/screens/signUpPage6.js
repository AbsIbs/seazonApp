import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

// Components
import pleaseNote from "../components/pleaseNote";
import globalStyle from "../utils/globalStyle";
import goals from "../components/goals";

const message = 'Please note that we will NOT be sharing this with other users'

const SignUpPage6 = () => {

    return(
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={globalStyle.signUpContainer}>
                <View style={styles().contentContainer}>
                    <View style={styles().container}>
                        {pleaseNote(message)}
                    </View>
                    <View style={styles().container}>
                        <Text style={styles().title}>Where do you usually find your recipes?</Text>
                    </View>
                    <View style={styles().container}>
                        {goals('Recipe apps')}
                    </View>
                    <View style={styles().container}>
                        {goals('Online blogs/websites')}
                    </View>
                    <View style={styles().container}>
                        {goals('YouTube')}
                    </View>
                    <View style={styles().container}>
                        {goals('TikTok')}
                    </View>
                    <View style={styles().container}>
                        {goals('Family and friends')}
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

export default SignUpPage6;