import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import signInTextField from '../components/signInTextField';
import SignUpBanner from '../components/signUpBanner';
import globalStyle from '../utils/globalStyle';

const SignUpPage2 = ({ navigation }) => {
    return(
        <View style={globalStyle.signUpContainer}>
            {SignUpBanner('Please tell us about yourself', navigation)}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default SignUpPage2;