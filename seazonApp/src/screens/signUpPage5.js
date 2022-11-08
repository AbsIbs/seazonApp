import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

// Components
import pleaseNote from "../components/pleaseNote";
import globalStyle from "../utils/globalStyle";
import Goals from "../components/goals";

const message = 'Please note that we will NOT be sharing this with other users'

const SignUpPage5 = (props) => {

    return(
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={globalStyle.signUpContainer}>
                <View style={styles().contentContainer}>
                    <View style={styles().container}>
                        {pleaseNote(message)}
                    </View>
                    <View style={{paddingTop: 20, paddingBottom: 10}}>
                        <Text style={styles().title}>What are your main goals?</Text>
                    </View>
                    <Goals setUserData={props.setUserData} />
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

export default SignUpPage5;