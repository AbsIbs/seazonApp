import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

// Components
import SignUpBanner from "../components/signUpBanner";
import pleaseNote from "../components/pleaseNote";
import signUpNextButton from "../components/signUpNextButton";
import globalStyle from "../utils/globalStyle";

const message = 'Please note that we will NOT be sharing this with other users'

const SignUpPage4 = ({navigation}) => {
    return(
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={globalStyle.signUpContainer}>
                {SignUpBanner('Where do your interests lie?', navigation)}
                <View style={styles().contentContainer}>
                    <View style={styles().container}>
                        {pleaseNote(message)}
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
    }
});

export default SignUpPage4;