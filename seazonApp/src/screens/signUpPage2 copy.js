import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import globalStyle from '../utils/globalStyle';

// components
import ProfilePicturePicker from '../components/profilePicturePicker';

const SignUpPage2Copy = (props) => {
    return(
        <ScrollView style={{backgroundColor: '#121212'}}>
            <View style={globalStyle.signUpContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Upload a profile picture</Text>
                        <Text style={styles.desc}>This image will be visible to other users</Text>
                    </View>
                    <View style={styles.genderContainer}>
                        <ProfilePicturePicker setUserData={props.setUserData} userData={props.userData} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '90%'
    },
    container: {
        paddingTop: 20
    },
    genderContainer: {
        paddingTop: 20,
        flex: 1
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18
    },
    desc: {
        fontSize: 12,
        color: '#ffffff87',
        paddingTop: 2.5
    }
});

export default SignUpPage2Copy;