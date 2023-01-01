import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpTextField from '../components/signUpTextField';
import globalStyle from '../utils/globalStyle';

const SignUpPage1 = (props) => {

    return(
        <View style={globalStyle.signUpContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.uploadContainer}> 
                    <View style={styles.textContainer}>
                        <Text style={styles.Title}>
                            Personal details
                        </Text>
                    </View>
                    <SignUpTextField iconName='envelope' placeholder='Email' secure={false} userData={props.userData} setUserData={props.setUserData} />
                    <SignUpTextField iconName='user' placeholder='Username' secure={false} userData={props.userData} setUserData={props.setUserData} />
                    <SignUpTextField iconName='lock' placeholder='Password' secure={true} userData={props.userData} setUserData={props.setUserData} />
                </View>
            </View>
        </View>
    ) 
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '90%'
    },
    uploadContainer: {
        flex: 1
    },
    formContainer: {
        flex: 1
    },
    textContainer: {
        paddingVertical: 30,
        justifyContent: 'center'
    },  
    Title: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '500'
    },
    Desc: {
        fontSize: 12,
        color: '#ffffff87'
    },
    imageContainer: {
        flexDirection: 'row'
    },
    iconContainer: {
        height: 100,
        width: 100,
        borderRadius: 50
    }
});

export default SignUpPage1;