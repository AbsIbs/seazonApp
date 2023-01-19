import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpTextField from '../components/signUpTextField';
import globalStyle from '../utils/globalStyle';

const SignUpPage0 = (props) => {

    return(
        <View style={globalStyle.signUpContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.uploadContainer}> 
                    <View style={styles.textContainer}>
                        <Text style={styles.Title}>
                            Personal details
                        </Text>
                        <Text style={styles.Desc}>
                            Your username will be public to the other users
                        </Text>
                    </View>
                    <View style={{paddingTop: 30}}>
                        <SignUpTextField iconName='envelope' placeholder='Email' secure={false} userData={props.userData} setUserData={props.setUserData} />
                        <SignUpTextField iconName='user' placeholder='Display Name' secure={false} userData={props.userData} setUserData={props.setUserData} />
                        <SignUpTextField iconName='lock' placeholder='Password' secure={true} userData={props.userData} setUserData={props.setUserData} />
                    </View>
                </View>
            </View>
        </View>
    ) 
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '90%',
        justifyContent: 'center'
    },
    uploadContainer: {
        flex: 1
    },
    formContainer: {
        flex: 1
    },
    textContainer: {
        paddingVertical: 20,
        justifyContent: 'center'
    },  
    Title: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    Desc: {
        fontSize: 12,
        color: '#ffffff87',
        paddingTop: 2.5
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

export default SignUpPage0;