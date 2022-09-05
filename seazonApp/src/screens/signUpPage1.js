import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import signInTextField from '../components/signInTextField';
import SignUpBanner from '../components/signUpBanner';
import globalStyle from '../utils/globalStyle';

import signUpNextButton from '../components/signUpNextButton';  

const SignUpPage1 = ({ navigation }) => {

    const data = {}

    return( 
        <KeyboardAvoidingView   
            enabled
            style = {globalStyle.signUpContainer}>
            {SignUpBanner("Hello, we'd love to know you!", navigation, 17)} 
            <View style={styles.contentContainer}>
                <View style={styles.uploadContainer}> 
                    <View style={styles.textContainer}>
                        <Text style={styles.Title}>
                            Upload your image
                        </Text>
                        <Text style={styles.Desc}>
                            This image will be visible to other users
                        </Text>
                    </View>
                    <View style={styles.imageContainer}> 
                        <Image
                            style={{width: 80, height: 80}}
                            source={require('../../assets/img/cameraAdd.png')}/>
                    </View>
                </View>
                <View style={styles.formContainer}>
                    {signInTextField('envelope', 'Email', false, data)}
                    {signInTextField('user', 'Username', false, data)}
                    {signInTextField('lock', 'Password', true, data)}
                </View>
                {signUpNextButton(navigation, 'Sign Up Page 2')}
            </View>
        </KeyboardAvoidingView>
    ) 
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '90%'
    },
    uploadContainer: {
        paddingTop: 40,
        flexDirection: 'row'
    },
    formContainer: {
        paddingTop: 40
    },
    textContainer: {
        flex: 9,
        justifyContent: 'center'
    },  
    Title: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '500'
    },
    Desc: {
        fontSize: 12,
        color: '#ffffff87'
    },
    imageContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SignUpPage1;