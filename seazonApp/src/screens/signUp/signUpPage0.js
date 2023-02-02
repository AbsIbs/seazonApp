import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpTextField from '../../components/signUpTextField';

const SignUpPage0 = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.Desc}>
                        We'd love to know you
                    </Text>
                    <Text style={styles.Title}>
                        Basic information
                    </Text>
                </View>
                <View style={{ paddingTop: 50 }}>
                    <SignUpTextField iconName='envelope' placeholder='Email' secure={false} userData={props.userData} setUserData={props.setUserData} />
                    <SignUpTextField iconName='user' placeholder='Display Name' secure={false} userData={props.userData} setUserData={props.setUserData} />
                    <SignUpTextField iconName='lock' placeholder='Password' secure={true} userData={props.userData} setUserData={props.setUserData} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        width: '90%'
    },
    textContainer: {
        paddingTop: 50,
        justifyContent: 'center'
    },
    Title: {
        fontSize: 22.5,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    Desc: {
        fontSize: 14,
        color: '#ffffff87',
        paddingTop: 2.5
    }
});

export default SignUpPage0;